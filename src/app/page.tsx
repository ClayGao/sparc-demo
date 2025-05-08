import Link from "next/link";
import Image from "next/image";

// 獲取最新三篇文章
const getRecentArticles = () => {
  // 這裡將使用靜態數據，後續可改為從MDX檔案讀取
  return [
    {
      slug: "getting-started-with-nextjs",
      title: "Next.js 15入門指南",
      description: "了解Next.js 15的新特性與如何開始你的第一個專案",
      date: "2025-05-08",
    },
    {
      slug: "exploring-react-server-components",
      title: "探索React Server Components",
      description: "深入了解React Server Components如何改變前端開發模式",
      date: "2025-04-15",
    },
    {
      slug: "tailwindcss-best-practices",
      title: "Tailwind CSS最佳實踐",
      description: "提升你的Tailwind CSS開發效率與代碼品質的技巧與策略",
      date: "2025-03-20",
    },
  ].slice(0, 3);
};

export default function Home() {
  const recentArticles = getRecentArticles();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pb-16 pt-8 md:pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Clay的個人<span className="text-blue-600 dark:text-blue-400">部落格</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            分享關於前端開發、網頁設計和軟體工程的心得與技術文章
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/blog"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              瀏覽所有文章
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
            >
              關於作者
            </Link>
          </div>
        </div>
      </section>
      
      {/* Recent Articles Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">最新文章</h2>
            <Link
              href="/blog"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              查看全部 →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                    {article.description}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-auto">
                    {article.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">技術專長</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                  <path d="M12 21a9 9 0 0 1 0-18" />
                  <path d="M3.6 9h16.8" />
                  <path d="M3.6 15h16.8" />
                </svg>
              </div>
              <h3 className="font-bold">React & Next.js</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                  <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                  <line x1="16" x2="2" y1="8" y2="22" />
                  <line x1="17.5" x2="9" y1="15" y2="15" />
                </svg>
              </div>
              <h3 className="font-bold">UI/UX設計</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                  <path d="M12 2v6.5l5-3 5 3V8" />
                  <path d="M2 13h20" />
                  <path d="M18 21a8 8 0 0 0-16 0" />
                </svg>
              </div>
              <h3 className="font-bold">效能優化</h3>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600 dark:text-yellow-400">
                  <path d="M4 11a9 9 0 0 1 9 9" />
                  <path d="M4 4a16 16 0 0 1 16 16" />
                  <circle cx="5" cy="19" r="1" />
                </svg>
              </div>
              <h3 className="font-bold">內容創作</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
