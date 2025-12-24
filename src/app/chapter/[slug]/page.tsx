import { notFound } from "next/navigation";
import Link from "next/link";
import { chapters, getChapterBySlug } from "@/lib/chapters";

interface ChapterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return chapters.map((chapter) => ({
    slug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter Not Found",
    };
  }

  return {
    title: `${chapter.title} | Making Your First $1M with AI`,
    description: chapter.content.slice(0, 160),
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    notFound();
  }

  const currentIndex = chapters.findIndex((ch) => ch.slug === slug);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="max-w-3xl mx-auto px-8 py-12">
      <div className="mb-8">
        <span className="text-blue-500 text-sm font-medium">
          {chapter.number === 0 ? "Introduction" : `Chapter ${chapter.number}`}
        </span>
        <h1 className="text-3xl font-bold text-white mt-2">
          {chapter.title}
        </h1>
      </div>

      <article className="prose prose-invert prose-lg max-w-none">
        {chapter.content.split("\n\n").map((paragraph, index) => {
          // Check if it's a heading (no period at end, relatively short, often bold markers)
          const isHeading = paragraph.length < 100 && !paragraph.endsWith(".") && !paragraph.startsWith("•") && !paragraph.startsWith("-");

          if (paragraph.startsWith("•") || paragraph.startsWith("-")) {
            return (
              <p key={index} className="text-gray-300 pl-4 border-l-2 border-blue-500 my-2">
                {paragraph}
              </p>
            );
          }

          if (isHeading && index > 0) {
            return (
              <h2 key={index} className="text-xl font-semibold text-white mt-8 mb-4">
                {paragraph}
              </h2>
            );
          }

          return (
            <p key={index} className="text-gray-300 leading-relaxed mb-4">
              {paragraph}
            </p>
          );
        })}
      </article>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-800">
        {prevChapter ? (
          <Link
            href={`/chapter/${prevChapter.slug}`}
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <div>
              <span className="text-xs text-gray-500 block">Previous</span>
              <span className="text-sm">{prevChapter.title}</span>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextChapter ? (
          <Link
            href={`/chapter/${nextChapter.slug}`}
            className="flex items-center text-right text-gray-400 hover:text-white transition-colors"
          >
            <div>
              <span className="text-xs text-gray-500 block">Next</span>
              <span className="text-sm">{nextChapter.title}</span>
            </div>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
