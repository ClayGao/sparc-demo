import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "我的文章 | Clay Blog",
  description: "Clay的技術文章、想法與心得分享",
};

// 這是臨時的文章數據，後續會從MDX檔案中讀取
const articles = [
  {
    slug: "getting-started-with-nextjs",
    title: "Next.js 15入門指南",
    description: "了解Next.js 15的新特性與如何開始你的第一個專案",
    date: "2025-05-08",
    tags: ["Next.js", "React", "前端開發"]
  },
  {
    slug: "exploring-react-server-components",
    title: "探索React Server Components",
    description: "深入了解React Server Components如何改變前端開發模式",
    date: "2025-04-15",
    tags: ["React", "Server Components", "效能優化"]
  },
  {
    slug: "tailwindcss-best-practices",
    title: "Tailwind CSS最佳實踐",
    description: "提升你的Tailwind CSS開發效率與代碼品質的技巧與策略",
    date: "2025-03-20",
    tags: ["CSS", "Tailwind", "前端設計"]
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">我的文章</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          在這裡分享我對網頁開發、程式設計與技術趨勢的想法與心得。
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map(article => (
          <article 
            key={article.slug}
            className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col h-full">
              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {article.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 dark:hover:text-blue-400">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.description}
                </p>
              </div>
              
              <div className="mt-auto pt-4 text-sm text-gray-500 dark:text-gray-400">
                {article.date}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}