import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

// 這是臨時的模擬數據，後續會從MDX檔案中讀取
const articles = [
  {
    slug: "getting-started-with-nextjs",
    title: "Next.js 15入門指南",
    description: "了解Next.js 15的新特性與如何開始你的第一個專案",
    date: "2025-05-08",
    tags: ["Next.js", "React", "前端開發"],
    content: `
      # Next.js 15入門指南

      Next.js 15是一個革命性的版本，帶來了許多令人興奮的新功能和改進。本文將帶你了解這些新特性，並指導你如何開始你的第一個Next.js 15專案。

      ## 主要新特性

      1. **異步API**: params和searchParams現在是Promise，需要使用await解析
      2. **Turbopack穩定版**: 更快的開發體驗
      3. **React 19支持**: 支持React 19的新特性
      4. **改進的緩存機制**: 對渲染和緩存模型進行了優化

      ## 安裝與設置

      使用以下命令創建一個新的Next.js 15專案:

      \`\`\`bash
      npx create-next-app@latest my-nextjs-app
      \`\`\`

      啟動開發服務器:

      \`\`\`bash
      cd my-nextjs-app
      npm run dev
      \`\`\`

      ## 異步API使用範例

      \`\`\`tsx
      // 之前
      export default function Page({ params, searchParams }) {
        const { slug } = params;
        return <h1>{slug}</h1>;
      }

      // 現在
      export default async function Page({ params, searchParams }) {
        const { slug } = await params;
        return <h1>{slug}</h1>;
      }
      \`\`\`

      ## 結論

      Next.js 15帶來了許多令人興奮的新功能，特別是異步API和改進的緩存機制，這使得構建高效能的網頁應用程式變得更加容易。
    `
  },
  {
    slug: "exploring-react-server-components",
    title: "探索React Server Components",
    description: "深入了解React Server Components如何改變前端開發模式",
    date: "2025-04-15",
    tags: ["React", "Server Components", "效能優化"],
    content: `
      # 探索React Server Components

      React Server Components是React的一個革命性功能，它改變了我們思考和構建UI的方式。本文將深入探討React Server Components的工作原理、優勢以及如何在實際項目中使用它。

      ## 什麼是React Server Components?

      React Server Components允許我們將React組件在服務器上渲染，並將結果發送給客戶端，而不需要發送JavaScript代碼。這意味著我們可以在服務器上執行數據獲取、訪問數據庫和文件系統等操作，而不需要在客戶端執行這些操作。

      ## 優勢

      1. **減少JavaScript負載**: 服務器組件不會增加客戶端的JavaScript包大小
      2. **直接訪問服務器資源**: 可以直接訪問數據庫、文件系統等
      3. **改進初始加載性能**: 減少了客戶端需要解析和執行的JavaScript代碼量
      4. **自動代碼拆分**: 服務器組件自動實現了代碼拆分

      ## 使用範例

      \`\`\`tsx
      // 服務器組件
      async function DataFetcher() {
        const data = await fetchData(); // 直接在服務器上獲取數據
        return <div>{data.map(item => <div key={item.id}>{item.name}</div>)}</div>;
      }

      // 客戶端組件
      'use client';
      function InteractiveComponent() {
        const [count, setCount] = useState(0);
        return (
          <button onClick={() => setCount(count + 1)}>
            Clicked {count} times
          </button>
        );
      }
      \`\`\`

      ## 結論

      React Server Components代表了前端開發範式的轉變，它允許我們更有效地利用服務器和客戶端的優勢，構建更高效、更輕量的應用程序。
    `
  },
  {
    slug: "tailwindcss-best-practices",
    title: "Tailwind CSS最佳實踐",
    description: "提升你的Tailwind CSS開發效率與代碼品質的技巧與策略",
    date: "2025-03-20",
    tags: ["CSS", "Tailwind", "前端設計"],
    content: `
      # Tailwind CSS最佳實踐

      Tailwind CSS是一個實用優先的CSS框架，它通過提供低級別的功能類來幫助你快速構建現代化的網站。本文將分享一些使用Tailwind CSS的最佳實踐，幫助你提高開發效率和代碼質量。

      ## 組織和重用

      使用@apply指令組合常用的功能類:

      \`\`\`css
      @layer components {
        .btn-primary {
          @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
        }
      }
      \`\`\`

      ## 響應式設計

      Tailwind提供了基於斷點的響應式前綴:

      \`\`\`html
      <div class="text-sm md:text-base lg:text-lg">
        This text changes size at different breakpoints
      </div>
      \`\`\`

      ## 主題化和定制

      在tailwind.config.js中擴展主題:

      \`\`\`js
      module.exports = {
        theme: {
          extend: {
            colors: {
              'brand-blue': '#1992d4',
            },
            spacing: {
              '72': '18rem',
            }
          }
        }
      }
      \`\`\`

      ## 結論

      Tailwind CSS提供了一種高效、靈活的方式來構建現代化的用戶界面。通過遵循這些最佳實踐，你可以充分發揮Tailwind的潛力，同時保持代碼的組織性和可維護性。
    `
  }
];

// 類型定義
type Props = {
  params: {
    slug: string;
  };
};

// 動態生成元數據
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find(article => article.slug === params.slug);
  
  if (!article) {
    return {
      title: '404 - 文章未找到',
      description: '無法找到請求的文章'
    };
  }
  
  return {
    title: `${article.title} | Clay Blog`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      tags: article.tags
    }
  };
}

// 靜態生成路徑
export function generateStaticParams() {
  return articles.map(article => ({
    slug: article.slug
  }));
}

// 文章內容處理函數 (臨時模擬MDX渲染)
function renderMarkdown(content: string) {
  // 這裡僅做簡單處理，實際應用中會使用MDX渲染
  return content.split('\n').map((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('# ')) {
      return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{trimmedLine.substring(2)}</h1>;
    } else if (trimmedLine.startsWith('## ')) {
      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{trimmedLine.substring(3)}</h2>;
    } else if (trimmedLine.startsWith('```')) {
      return <pre key={index} className="bg-gray-100 dark:bg-gray-800 p-4 rounded my-4 overflow-x-auto font-mono text-sm">{trimmedLine}</pre>;
    } else if (trimmedLine) {
      return <p key={index} className="my-4">{trimmedLine}</p>;
    }
    return null;
  });
}

export default function ArticlePage({ params }: Props) {
  const article = articles.find(article => article.slug === params.slug);
  
  if (!article) {
    notFound();
  }
  
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link 
          href="/blog"
          className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center mb-6"
        >
          ← 返回所有文章
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-4">
          <time dateTime={article.date}>{article.date}</time>
        </div>
        
        <div className="flex gap-2 mb-8 flex-wrap">
          {article.tags.map(tag => (
            <span 
              key={tag} 
              className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="prose dark:prose-invert lg:prose-lg max-w-none">
        {renderMarkdown(article.content)}
      </div>
    </article>
  );
}