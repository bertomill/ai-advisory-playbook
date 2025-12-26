"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChapterLink {
  id: string;
  number: number | string;
  title: string;
  slug: string;
}

interface SidebarProps {
  chapters: ChapterLink[];
}

export default function Sidebar({ chapters }: SidebarProps) {
  const pathname = usePathname();
  const [isBookOpen, setIsBookOpen] = useState(
    pathname.startsWith("/chapter") || pathname === "/"
  );

  const isOnRoadmap = pathname === "/roadmap";
  const isOnBook = pathname.startsWith("/chapter") || pathname === "/";

  return (
    <aside className="w-72 bg-gray-900 text-gray-100 h-screen overflow-y-auto fixed left-0 top-0 border-r border-gray-800">
      <div className="p-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-white mb-2">
            Making Your First $1M with AI
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            The AI Advisory Playbook
          </p>
        </Link>

        {/* Main Menu */}
        <nav className="space-y-2">
          {/* Practical Application */}
          <Link
            href="/roadmap"
            className={`flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
              isOnRoadmap
                ? "bg-[#41B3A3] text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <svg
              className="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            Practical Application
          </Link>

          {/* Book Contents - Collapsible */}
          <div>
            <button
              onClick={() => setIsBookOpen(!isBookOpen)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                isOnBook && !isOnRoadmap
                  ? "bg-gray-800 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Book Contents
              </div>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isBookOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Chapter List */}
            {isBookOpen && (
              <div className="mt-2 ml-2 pl-4 border-l border-gray-800 space-y-1">
                {chapters.map((chapter) => {
                  const isActive = pathname === `/chapter/${chapter.slug}`;
                  return (
                    <Link
                      key={chapter.id}
                      href={`/chapter/${chapter.slug}`}
                      className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-[#41B3A3] text-white"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="text-gray-500 mr-2">
                        {chapter.number === 0
                          ? "Intro"
                          : chapter.number === "conclusion"
                          ? ""
                          : chapter.number === "closing"
                          ? ""
                          : `${chapter.number}.`}
                      </span>
                      <span className="line-clamp-1">{chapter.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    </aside>
  );
}
