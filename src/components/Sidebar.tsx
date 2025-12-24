"use client";

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

        <nav className="space-y-1">
          {chapters.map((chapter) => {
            const isActive = pathname === `/chapter/${chapter.slug}`;
            return (
              <Link
                key={chapter.id}
                href={`/chapter/${chapter.slug}`}
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-gray-500 mr-2">
                  {chapter.number === 0 ? "Intro" : chapter.number === "conclusion" ? "" : chapter.number === "closing" ? "" : `Ch ${chapter.number}`}
                </span>
                <span className="line-clamp-2">{chapter.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
