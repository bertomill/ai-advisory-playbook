"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBook,
  IconChecklist,
  IconChevronDown,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface ChapterLink {
  id: string;
  number: number | string;
  title: string;
  slug: string;
}

interface AppSidebarProps {
  chapters: ChapterLink[];
}

export default function AppSidebar({ chapters }: AppSidebarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [bookExpanded, setBookExpanded] = useState(
    pathname.startsWith("/chapter") || pathname === "/"
  );

  const isOnRoadmap = pathname === "/roadmap";

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 bg-gray-900 border-r border-gray-800">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {/* Logo */}
          <Link href="/" className="relative z-20 flex items-center gap-2 py-1">
            <Image
              src="/logo-icon.svg"
              alt="AI Advisory Logo"
              width={28}
              height={28}
              className="shrink-0"
            />
            <motion.span
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="font-bold whitespace-pre text-white text-sm"
            >
              $1M AI Playbook
            </motion.span>
          </Link>

          {/* Navigation */}
          <div className="mt-8 flex flex-col gap-2">
            {/* Practical Application */}
            <Link
              href="/roadmap"
              className={cn(
                "flex items-center gap-2 py-2 px-1 rounded-lg transition-colors",
                isOnRoadmap
                  ? "bg-[#41B3A3] text-white"
                  : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <IconChecklist className="h-5 w-5 shrink-0" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-sm whitespace-pre"
              >
                Practical Application
              </motion.span>
            </Link>

            {/* Book Contents */}
            <div>
              <button
                onClick={() => setBookExpanded(!bookExpanded)}
                className={cn(
                  "w-full flex items-center gap-2 py-2 px-1 rounded-lg transition-colors text-left",
                  pathname.startsWith("/chapter") || pathname === "/"
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800"
                )}
              >
                <IconBook className="h-5 w-5 shrink-0" />
                <motion.span
                  animate={{
                    display: open ? "inline-block" : "none",
                    opacity: open ? 1 : 0,
                  }}
                  className="text-sm whitespace-pre flex-1"
                >
                  Book Contents
                </motion.span>
                <motion.div
                  animate={{
                    display: open ? "block" : "none",
                    opacity: open ? 1 : 0,
                    rotate: bookExpanded ? 180 : 0,
                  }}
                >
                  <IconChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              {/* Chapter List */}
              <AnimatePresence>
                {bookExpanded && open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 ml-3 pl-3 border-l border-gray-700 space-y-1">
                      {chapters.map((chapter) => {
                        const isActive = pathname === `/chapter/${chapter.slug}`;
                        return (
                          <Link
                            key={chapter.id}
                            href={`/chapter/${chapter.slug}`}
                            className={cn(
                              "block px-2 py-1.5 rounded text-xs transition-colors",
                              isActive
                                ? "bg-[#41B3A3] text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                          >
                            <span className="text-gray-500 mr-1">
                              {chapter.number === 0
                                ? "0."
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
