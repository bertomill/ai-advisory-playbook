import Link from "next/link";
import { chapters } from "@/lib/chapters";

export default function Home() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Making Your First $1M with AI
        </h1>
        <p className="text-xl text-gray-400 mb-6">
          How to Sell High-Value AI Advisory Offers That Scale to Millions
        </p>
        <p className="text-gray-300 leading-relaxed">
          This playbook will teach you how to position yourself as a Fractional AI Officer,
          package premium advisory offers, and build a million-dollar AI advisory business.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Start Reading</h2>
        <Link
          href={`/chapter/${chapters[0].slug}`}
          className="inline-flex items-center px-6 py-3 bg-[#41B3A3] hover:bg-[#359E8F] text-white font-medium rounded-lg transition-colors"
        >
          Begin with {chapters[0].title}
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Table of Contents</h2>
        <div className="space-y-2">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/chapter/${chapter.slug}`}
              className="block p-4 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors border border-gray-800"
            >
              <div className="flex items-center">
                <span className="text-[#41B3A3] font-mono text-sm mr-4">
                  {String(index).padStart(2, '0')}
                </span>
                <span className="text-white">{chapter.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
