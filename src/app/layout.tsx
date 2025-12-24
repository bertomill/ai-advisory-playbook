import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { chapters } from "@/lib/chapters";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Making Your First $1M with AI",
  description: "The AI Advisory Playbook - How to Sell High-Value AI Advisory Offers That Scale to Millions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const chapterLinks = chapters.map(ch => ({
    id: ch.id,
    number: ch.number,
    title: ch.title,
    slug: ch.slug,
  }));

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950`}
      >
        <Sidebar chapters={chapterLinks} />
        <main className="ml-72 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
