import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import bookEmbeddings from '@/lib/book-embeddings.json';
import { phases } from '@/lib/milestones';

export const maxDuration = 60;

interface BookChunk {
  id: string;
  chapterNumber: number | string;
  chapterTitle: string;
  content: string;
  embedding: number[];
}

const chunks = bookEmbeddings as BookChunk[];

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function semanticSearch(query: string): Promise<Array<{ chapter: string; content: string; score: number }>> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const queryEmbedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });

  const queryVector = queryEmbedding.data[0].embedding;

  const scored = chunks.map(chunk => ({
    chapter: `Chapter ${chunk.chapterNumber}: ${chunk.chapterTitle}`,
    content: chunk.content,
    score: cosineSimilarity(queryVector, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8);
}

async function rerankWithClaude(
  anthropic: Anthropic,
  query: string,
  candidates: Array<{ chapter: string; content: string; score: number }>
): Promise<Array<{ chapter: string; excerpt: string }>> {
  const candidateList = candidates
    .map((c, i) => `[${i + 1}] ${c.chapter}\n${c.content.slice(0, 600)}...`)
    .join('\n\n---\n\n');

  const result = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 100,
    messages: [
      {
        role: 'user',
        content: `Query: "${query}"

Here are ${candidates.length} candidate passages. Select the 3 MOST relevant.
Respond with ONLY the numbers like: 1, 4, 2

Candidates:
${candidateList}`,
      },
    ],
  });

  const responseText = result.content[0].type === 'text' ? result.content[0].text : '';
  const selectedIndices = responseText
    .match(/\d+/g)
    ?.map(n => parseInt(n) - 1)
    .filter(i => i >= 0 && i < candidates.length)
    .slice(0, 3) || [0, 1, 2];

  return selectedIndices.map(i => ({
    chapter: candidates[i].chapter,
    excerpt: candidates[i].content.slice(0, 800) + (candidates[i].content.length > 800 ? '...' : ''),
  }));
}

async function searchBook(anthropic: Anthropic, query: string): Promise<{ results: Array<{ chapter: string; excerpt: string }> }> {
  console.log('🔍 Semantic search for:', query);

  const candidates = await semanticSearch(query);
  console.log(`  Found ${candidates.length} candidates (top score: ${candidates[0]?.score.toFixed(3)})`);

  const reranked = await rerankWithClaude(anthropic, query, candidates);
  console.log(`  Re-ranked to ${reranked.length} final results`);

  return { results: reranked };
}

// Helper to get task info from milestone/task IDs
function getTaskInfo(milestoneId: string, taskId: string): { milestoneTitle: string; taskTitle: string; phase: number } | null {
  for (const phase of phases) {
    for (const milestone of phase.milestones) {
      if (milestone.id === milestoneId) {
        const task = milestone.tasks.find(t => t.id === taskId);
        if (task) {
          return {
            milestoneTitle: milestone.title,
            taskTitle: task.title,
            phase: phase.number,
          };
        }
      }
    }
  }
  return null;
}

// Fetch user's notes and progress from Supabase
async function getUserNotes(): Promise<Array<{
  phase: number;
  milestone: string;
  task: string;
  notes: string;
  completed: boolean;
  completedAt: string | null;
}>> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('Supabase not configured');
    return [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', 'default_user');

  if (error) {
    console.error('Error fetching notes:', error);
    return [];
  }

  // Map the data to include task titles
  const notesWithContext = (data || [])
    .filter(item => item.notes && item.notes.trim().length > 0)
    .map(item => {
      const taskInfo = getTaskInfo(item.milestone_id, item.task_id);
      return {
        phase: taskInfo?.phase || 0,
        milestone: taskInfo?.milestoneTitle || item.milestone_id,
        task: taskInfo?.taskTitle || item.task_id,
        notes: item.notes,
        completed: item.completed,
        completedAt: item.completed_at,
      };
    })
    .sort((a, b) => a.phase - b.phase);

  return notesWithContext;
}

// Tool definitions matching Anthropic's exact format
const searchBookTool: Anthropic.Tool = {
  name: 'search_book',
  description: 'Semantic search through the AI Advisory Business methodology book. Uses AI embeddings to find content by meaning, not just keywords. Search for concepts like "handling price objections", "sales call structure", or "positioning as expert".',
  input_schema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query in natural language',
      },
    },
    required: ['query'],
  },
};

const getUserNotesTool: Anthropic.Tool = {
  name: 'get_user_notes',
  description: 'Retrieve all of the user\'s notes and progress from their tasks. Use this to understand what the user has already worked on, their thoughts, decisions, and where they are in their journey. Returns notes organized by phase and task.',
  input_schema: {
    type: 'object',
    properties: {},
    required: [],
  },
};

export async function POST(req: Request) {
  try {
    const { messages, taskContext } = await req.json();

    console.log('Chat request received:', JSON.stringify({ messageCount: messages?.length, taskContext }, null, 2));

    if (!process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const validMessages = (messages || []).filter((m: { role: string; content: string }) =>
      m && m.content && m.content.trim().length > 0
    );

    while (validMessages.length > 0 && validMessages[0].role === 'assistant') {
      validMessages.shift();
    }

    if (validMessages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid messages to process' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `You are an expert AI business coach helping someone build a million-dollar AI advisory business.

## THE OVERALL GOAL
Help the user become a "Fractional AI Officer" - an executive-level AI strategist who helps businesses ($1M-$50M revenue) identify and close their "AI Profit Gap." The goal is to build a $1M+ advisory business through:
- Premium retainer pricing ($2,500-$10,000/month)
- Long-term contracts (24-36 months)
- Strategy over delivery (be the general contractor, not the tool builder)

## KEY METHODOLOGY
1. **The AI Profit Gap**: Every business has inefficiencies that AI can fix. Your job is to expose the gap and put a dollar sign on it.
2. **Strategy > Tools**: Don't sell tools or implementations. Sell outcomes and ROI.
3. **The Offer Stack**:
   - Entry: AI Growth & Profit Assessment ($1,000-$5,000)
   - Core: Monthly Advisory Retainer ($2,500-$10,000/month)
4. **Promise-Process-Proof Framework**: Clear outcome promise, simple 3-step process, case studies with ROI.
5. **Target Niches**: Home services, med spas, law firms, real estate, e-commerce ($2M-$20M), B2B SaaS.

## CURRENT TASK
**${taskContext?.title || 'General AI Advisory Business'}**

${taskContext?.guidance ? `GUIDANCE:\n${taskContext.guidance}` : ''}

## YOUR ROLE
- Help them understand and complete this specific task
- Give practical, actionable advice tied to the methodology above
- Provide examples, templates, scripts, and specific language they can use
- Help them overcome obstacles and objections
- Be direct and confident - no fluff, no hedging
- Always tie advice back to ROI and outcomes

## TOOLS
You have access to TWO tools:

### 1. search_book
Semantic search through the AI Advisory Business methodology book. Use it when:
- The user asks for specific scripts, templates, or exact language from the book
- You need to reference specific frameworks, objection handling, or sales techniques
- The user asks "what does the book say about..."

### 2. get_user_notes
Retrieve the user's notes and progress from all their tasks. Use it when:
- You want to understand what the user has already worked on
- The user asks about their progress or previous decisions
- You need context about their niche, positioning, or choices
- You want to give personalized advice based on their journey

**IMPORTANT: Show transparency when using tools:**
- When using search_book, show "📚 **Book sources:**" with chapters cited
- When using get_user_notes, show "📝 **Your notes:**" summarizing what you found
- Always cite sources and reference the user's own words when relevant

Keep responses concise. Use markdown formatting (bold, bullets, headers) for clarity.`;

    // Convert messages to Anthropic format
    const anthropicMessages: Anthropic.MessageParam[] = validMessages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    // Initial API call with tools
    let response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: systemPrompt,
      tools: [searchBookTool, getUserNotesTool],
      messages: anthropicMessages,
    });

    // Handle tool use loop (max 5 iterations for multiple tool calls)
    let iterations = 0;
    while (response.stop_reason === 'tool_use' && iterations < 5) {
      iterations++;
      const toolUseBlock = response.content.find(block => block.type === 'tool_use');

      if (toolUseBlock && toolUseBlock.type === 'tool_use') {
        console.log('Tool use requested:', toolUseBlock.name);

        let toolResult: unknown;

        // Execute the appropriate tool
        if (toolUseBlock.name === 'search_book') {
          const toolInput = toolUseBlock.input as { query: string };
          toolResult = await searchBook(anthropic, toolInput.query);
        } else if (toolUseBlock.name === 'get_user_notes') {
          console.log('📝 Fetching user notes...');
          const notes = await getUserNotes();
          console.log(`  Found ${notes.length} notes`);
          toolResult = {
            notesCount: notes.length,
            notes: notes.map(n => ({
              phase: n.phase,
              milestone: n.milestone,
              task: n.task,
              notes: n.notes,
              completed: n.completed,
            })),
          };
        }

        // Continue conversation with tool result
        anthropicMessages.push({
          role: 'assistant',
          content: response.content,
        });
        anthropicMessages.push({
          role: 'user',
          content: [
            {
              type: 'tool_result',
              tool_use_id: toolUseBlock.id,
              content: JSON.stringify(toolResult),
            },
          ],
        });

        response = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 2048,
          system: systemPrompt,
          tools: [searchBookTool, getUserNotesTool],
          messages: anthropicMessages,
        });
      }
    }

    // Extract final text response
    const textBlock = response.content.find(block => block.type === 'text');
    const responseText = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    console.log('API response received:', responseText?.substring(0, 100));

    // Return in the format the client expects
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(`0:${JSON.stringify(responseText)}\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
