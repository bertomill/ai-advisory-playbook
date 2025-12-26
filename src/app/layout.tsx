import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import AppSidebar from "@/components/AppSidebar";
import { chapters } from "@/lib/chapters";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${lora.variable} antialiased bg-[#141413]`}
      >
        <div className="flex h-screen w-full">
          <AppSidebar chapters={chapterLinks} />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
