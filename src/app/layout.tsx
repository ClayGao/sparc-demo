import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clay | 個人部落格",
  description: "一個使用Next.js 15和MDX構建的精緻個人部落格",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="container mx-auto px-4 py-8 mt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Clay Blog. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
