const fs = require('fs');
const path = require('path');

// Read all chapter files from parent directory
const parentDir = path.join(__dirname, '../../');
const files = fs.readdirSync(parentDir).filter(f => f.endsWith('.txt'));

// Sort files by chapter number
const chapterOrder = [
  'chapter-0-The-Mission-Behind-the-Book.txt',
  'Chapter 1: The Business AI Myth – Why Most Owners Miss the Real Money.txt',
  'Chapter 2: Strategy vs. Tech – Why You Don\'t Need to Code.txt',
  'Chapter 3: The $100K Offer Stack – What to Sell and How to Price It.txt',
  'Chapter 4: The Gold Rush Is Now – Stake Your Claim or Be Left Behind.txt',
  'Chapter 5: Picking Your Niche – Who You Serve Determines What You Earn.txt',
  'Chapter 6: Crafting a Premium Offer – The Promise, Process, and Proof Framework.txt',
  'Chapter 7: The Client Acquisition Engine – How to Get Clients Without Cold Calling.txt',
  'Chapter 8: Crafting the Messaging That Sells (Without Sounding Like a Geek).txt',
  'Chapter 9: Running High-Converting Sales Calls.txt',
  'Chapter 10: Delivering Results – How to Keep Clients and Get Referrals.txt',
  'Chapter 11: Case Studies and Proof.txt',
  'Chapter 12: Scaling Your Advisory Business.txt',
  'Chapter 13: The $1M Roadmap – Putting It All Together.txt',
  'Chapter 14: Final Words – Go Build Your $1M AI Advisory.txt',
  'Chapter 15: Scaling Beyond You – Hiring Advisors, Building a Team.txt',
  'Chapter 16: How to Stay Ahead as AI Evolves.txt',
  'Chapter 17: Building Recurring Value So Clients Stick.txt',
  'Chapter 18: Expanding Into New Niches and Industries.txt',
  'Chapter 19: The $10M Vision – Owning the Market.txt',
  'Conclusion: Run the Play, Own the Future.txt',
  'Closing Chapter: Freedom at the Water\'s Edge.txt'
];

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

function extractTitle(filename) {
  // Remove .txt extension
  let name = filename.replace('.txt', '');

  // Handle different formats
  if (name.startsWith('chapter-0')) {
    return 'The Mission Behind the Book';
  }
  if (name.startsWith('Chapter ')) {
    // Extract title after the colon
    const colonIndex = name.indexOf(':');
    if (colonIndex !== -1) {
      return name.substring(colonIndex + 1).trim().replace(/–/g, '-');
    }
    return name.replace(/Chapter \d+:\s*/, '').trim();
  }
  if (name.startsWith('Conclusion:')) {
    return name.replace('Conclusion: ', '').trim();
  }
  if (name.startsWith('Closing Chapter:')) {
    return name.replace('Closing Chapter: ', '').trim();
  }
  return name;
}

function extractNumber(filename) {
  if (filename.startsWith('chapter-0')) return 0;
  if (filename.startsWith('Conclusion')) return 'conclusion';
  if (filename.startsWith('Closing')) return 'closing';

  const match = filename.match(/Chapter (\d+)/);
  if (match) return parseInt(match[1]);
  return 0;
}

const chapters = [];

for (const filename of chapterOrder) {
  const filepath = path.join(parentDir, filename);
  if (!fs.existsSync(filepath)) {
    console.warn(`File not found: ${filename}`);
    continue;
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  const title = extractTitle(filename);
  const number = extractNumber(filename);
  const slug = slugify(title);

  chapters.push({
    id: `chapter-${number}`,
    number,
    title,
    slug,
    content: content.trim()
  });
}

// Output as TypeScript
console.log(`export interface Chapter {
  id: string;
  number: number | string;
  title: string;
  slug: string;
  content: string;
}

export const chapters: Chapter[] = ${JSON.stringify(chapters, null, 2)};

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find(chapter => chapter.slug === slug);
}

export function getAllChapterSlugs(): string[] {
  return chapters.map(chapter => chapter.slug);
}
`);
