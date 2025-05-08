import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我 | Clay Blog",
  description: "了解關於Clay的個人介紹、背景和專業技能",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">關於我</h1>
      
      <div className="prose dark:prose-invert lg:prose-lg max-w-none">
        <p className="text-lg mb-4">
          嗨！我是Clay，一位熱衷於網頁開發和技術寫作的軟體工程師。
        </p>
        
        <p className="mb-4">
          我專注於使用現代前端技術建構高效能、可擴展的網頁應用程式。特別熟悉Next.js、React和TypeScript等技術棧。
          目前主要關注於Web Performance優化、SSR/SSG策略以及使用者體驗設計。
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">專業技能</h2>
        
        <ul className="list-disc pl-5 space-y-2 mb-6">
          <li>前端開發：React, Next.js, TypeScript, Tailwind CSS</li>
          <li>後端技術：Node.js, Express, GraphQL, REST API設計</li>
          <li>開發工具：Git, Jest, GitHub Actions, Webpack, Vite</li>
          <li>效能優化：網頁性能分析、SEO最佳化、核心網頁指標(CWV)優化</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">聯絡方式</h2>
        
        <p className="mb-6">
          歡迎透過以下方式與我聯繫，討論項目合作或分享技術心得：
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li>Email: <a href="mailto:example@clay.blog" className="text-blue-600 dark:text-blue-400 hover:underline">example@clay.blog</a></li>
          <li>GitHub: <a href="https://github.com/clay" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">github.com/clay</a></li>
          <li>LinkedIn: <a href="https://linkedin.com/in/clay" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">linkedin.com/in/clay</a></li>
        </ul>
      </div>
    </div>
  );
}