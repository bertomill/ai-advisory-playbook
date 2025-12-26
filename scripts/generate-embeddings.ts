import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { chapters } from '../src/lib/chapters';

// Define the shape of our chunk for embeddings
interface BookChunk {
  id: string;
  chapterNumber: number | string;
  chapterTitle: string;
  content: string;
  embedding?: number[]; // Holds embedding once generated
}

// Break a chapter into chunks based on paragraphs and size limits
function chunkChapter(chapter: typeof chapters[0]): BookChunk[] {
  const chunks: BookChunk[] = [];

  // Split the content on double newlines, assuming each is a paragraph
  const paragraphs = chapter.content.split(/\n\n+/);

  let currentChunk = '';
  let chunkIndex = 0;

  for (const para of paragraphs) {
    const trimmed = para.trim();
    // Skip paragraphs that are too short (likely headings or noise)
    if (!trimmed || trimmed.length < 30) continue;

    // If adding the paragraph would make this chunk too large, and chunk has enough content, save and start a new chunk
    if (currentChunk.length + trimmed.length > 1500 && currentChunk.length > 200) {
      chunks.push({
        id: `${chapter.id}-chunk-${chunkIndex}`,
        chapterNumber: chapter.number,
        chapterTitle: chapter.title,
        content: currentChunk.trim(),
      });
      currentChunk = '';
      chunkIndex++;
    }

    // Add paragraph to chunk, keeping paragraph breaks
    currentChunk += (currentChunk ? '\n\n' : '') + trimmed;
  }

  // Add any remaining chunk if it has enough text
  if (currentChunk.trim().length > 100) {
    chunks.push({
      id: `${chapter.id}-chunk-${chunkIndex}`,
      chapterNumber: chapter.number,
      chapterTitle: chapter.title,
      content: currentChunk.trim(),
    });
  }

  return chunks;
}

// Main function to generate and save all embeddings for all chapters
async function generateEmbeddings() {
  // Check for OpenAI key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    // Explain what to do if missing
    console.error('OPENAI_API_KEY environment variable is required');
    console.error('Run: export OPENAI_API_KEY=your-key-here');
    process.exit(1);
  }

  // Create OpenAI client
  const openai = new OpenAI({ apiKey });

  // Tell user how many chapters being processed
  console.log(`Processing ${chapters.length} chapters...`);

  // Chunk chapters and collect all chunks together
  const allChunks: BookChunk[] = [];
  for (const chapter of chapters) {
    const chunks = chunkChapter(chapter);
    console.log(`  Chapter ${chapter.number}: ${chunks.length} chunks`);
    allChunks.push(...chunks);
  }

  // Report number of total chunks to process
  console.log(`\nTotal chunks: ${allChunks.length}`);
  console.log('Generating embeddings (this may take a minute)...\n');

  // Process embeddings in batches to avoid rate limit (batch size can be adjusted as needed)
  const batchSize = 20;
  for (let i = 0; i < allChunks.length; i += batchSize) {
    // Select current batch of chunks
    const batch = allChunks.slice(i, i + batchSize);
    // Extract texts for embedding
    const texts = batch.map(c => c.content);

    try {
      // Call OpenAI API to get embeddings for this batch
      const response = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: texts,
      });

      // Assign each embedding back to its chunk
      for (let j = 0; j < batch.length; j++) {
        batch[j].embedding = response.data[j].embedding;
      }

      // Progress logging
      console.log(`  Processed ${Math.min(i + batchSize, allChunks.length)}/${allChunks.length} chunks`);
    } catch (error) {
      // On error, print which batch failed and exit so you don't save partial results
      console.error(`Error generating embeddings for batch starting at ${i}:`, error);
      process.exit(1);
    }
  }

  // Save all chunks with embeddings to a JSON file so they can be used for search later
  const outputPath = path.join(__dirname, '../src/lib/book-embeddings.json');
  fs.writeFileSync(outputPath, JSON.stringify(allChunks, null, 2));

  // Final status messages
  console.log(`\nEmbeddings saved to ${outputPath}`);
  console.log(`Total chunks with embeddings: ${allChunks.length}`);
}

// Run the main process. Top-level await is not available in old Node versions, so catch errors here.
generateEmbeddings().catch(console.error);
