import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';

export async function GET() {
  const key = process.env.ANTHROPIC_API_KEY;

  if (!key) {
    return new Response(JSON.stringify({ error: 'No API key' }), { status: 500 });
  }

  try {
    const result = await generateText({
      model: anthropic('claude-sonnet-4-20250514'),
      prompt: 'Say "API working" in 2 words',
      maxTokens: 10,
    });

    return new Response(
      JSON.stringify({ success: true, response: result.text }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
        details: String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
