# Clay個人部落格 - 技術規格文檔

本文檔提供Clay個人部落格系統第一階段開發的詳細技術規格。

## 1. 導航設計規格

### 1.1 導航欄需求

導航欄需包含「關於我」與「我的文章」兩個主要選項，需要：

- **位置**: 置頂，固定位置
- **樣式**: 簡潔、現代風格
- **內容**: Logo/網站名稱、「關於我」連結、「我的文章」連結、(可選)主題切換按鈕
- **視覺層次**: 清晰可見，使用適當對比度

### 1.2 導航欄技術實現

```tsx
// app/components/Navigation.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  
  const navLinks = [
    { href: '/about', label: '關於我' },
    { href: '/blog', label: '我的文章' },
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo/網站名 */}
        <Link href="/" className="font-bold text-xl text-gray-900 dark:text-white">
          Clay
        </Link>
        
        {/* 桌面導航 */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300'
              } hover:text-blue-800 dark:hover:text-blue-300 transition-colors`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* 行動裝置選單按鈕 */}
        <button
          className="md:hidden text-gray-600 dark:text-gray-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="選單"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* 行動裝置導航下拉選單 */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white dark:bg-gray-800 shadow-lg border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300'
                } hover:text-blue-800 dark:hover:text-blue-300 transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
```

### 1.3 導航測試規格

```tsx
// app/components/Navigation.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from './Navigation'

// 模擬next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/'),
}))

describe('Navigation', () => {
  it('renders the logo text', () => {
    render(<Navigation />)
    expect(screen.getByText('Clay')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText('關於我')).toBeInTheDocument()
    expect(screen.getByText('我的文章')).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', () => {
    render(<Navigation />)
    const menuButton = screen.getByLabelText('選單')
    
    // 初始狀態下選單是關閉的
    expect(screen.queryByText('關於我')).not.toBeVisible()
    
    // 點擊後選單應該打開
    fireEvent.click(menuButton)
    expect(screen.getByText('關於我')).toBeVisible()
    
    // 再次點擊後選單應該關閉
    fireEvent.click(menuButton)
    expect(screen.queryByText('關於我')).not.toBeVisible()
  })
})
```

## 2. 響應式設計規格

### 2.1 斷點定義

基於Tailwind CSS的斷點系統：

- **默認**: 行動裝置 (< 768px)
- **md**: 平板裝置 (≥ 768px)
- **lg**: 小型桌面 (≥ 1024px)
- **xl**: 大型桌面 (≥ 1280px)
- **2xl**: 超大屏幕 (≥ 1536px)

主要關注點為768px（md斷點），作為主要布局切換點。

### 2.2 響應式布局策略

| 元素 | 行動裝置 (<768px) | 平板及以上 (≥768px) |
|------|-----------------|-------------------|
| 導航欄 | 漢堡選單，點擊展開 | 水平導航列 |
| 文章列表 | 單列布局 | 多列網格布局 |
| 文章詳情 | 全寬內容 | 內容+側邊欄布局 |
| 側邊欄 | 折疊/底部顯示 | 固定於內容側邊 |

### 2.3 響應式元素實例

```tsx
// app/components/ArticleGrid.tsx
export function ArticleGrid({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}

// app/blog/[slug]/page.tsx
export default function ArticlePage({ article }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <article className="w-full md:w-2/3 pr-0 md:pr-8">
          {/* 文章內容 */}
          <h1>{article.title}</h1>
          <MDXContent content={article.content} />
        </article>
        
        <aside className="w-full md:w-1/3 mt-8 md:mt-0">
          {/* 側邊欄 */}
          <div className="sticky top-20">
            <TableOfContents headings={article.headings} />
            <RelatedArticles articles={article.related} />
          </div>
        </aside>
      </div>
    </div>
  )
}
```

## 3. MDX內容實現規格

### 3.1 檔案結構

```
content/
├── blog/
│   ├── first-post.mdx
│   ├── second-post.mdx
│   └── ...
└── pages/
    └── about.mdx
```

### 3.2 MDX文章格式

```mdx
---
title: "Next.js 15的新特性深入解析"
description: "探索Next.js 15版本中的革命性變化與最佳實踐"
date: "2025-05-08"
tags: ["Next.js", "React", "Web開發"]
image: "/images/posts/nextjs15.jpg"
published: true
featured: false
---

# Next.js 15的新特性深入解析

Next.js 15帶來了許多令人興奮的新功能。讓我們深入了解這些變化！

<Callout type="info">
  本文基於Next.js 15.3.2版本，使用了React 19的最新特性。
</Callout>

## 異步API變更

最顯著的變化是參數現在都是異步的：

<CodeBlock language="tsx">
{`
// 之前
const params = props.params;

// 現在
const params = await props.params;
`}
</CodeBlock>

...文章內容繼續...
```

### 3.3 MDX處理流程

1. **解析MDX文件**:

```tsx
// lib/mdx.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypePrism from 'rehype-prism-plus'
import remarkGfm from 'remark-gfm'

const contentDirectory = path.join(process.cwd(), 'content')

export async function getArticleBySlug(slug: string) {
  const filePath = path.join(contentDirectory, 'blog', `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  
  const { content, data } = matter(fileContent)
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  })
  
  return {
    slug,
    content: mdxSource,
    frontmatter: data,
  }
}

export function getAllArticles() {
  const files = fs.readdirSync(path.join(contentDirectory, 'blog'))
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const fileContent = fs.readFileSync(
        path.join(contentDirectory, 'blog', file),
        'utf8'
      )
      
      const { data } = matter(fileContent)
      const slug = file.replace(/\.mdx$/, '')
      
      return {
        slug,
        ...data,
      }
    })
    .filter(article => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
```

2. **渲染MDX內容**:

```tsx
// app/components/MDXContent.tsx
'use client'

import { MDXRemote } from 'next-mdx-remote'
import { MDXComponents } from './MDXComponents'

export function MDXContent({ content }) {
  return <MDXRemote {...content} components={MDXComponents} />
}
```

## 4. 自定義組件系統規格

### 4.1 組件目錄結構

```
app/components/
├── ui/                # 基礎UI組件
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ...
├── layout/            # 布局組件
│   ├── Container.tsx
│   └── ...
├── mdx/               # MDX增強組件
│   ├── Callout.tsx
│   ├── CodeBlock.tsx
│   └── ...
├── blog/              # 部落格專用組件
│   ├── ArticleCard.tsx
│   ├── TableOfContents.tsx
│   └── ...
└── MDXComponents.tsx  # MDX組件映射
```

### 4.2 MDX組件映射

```tsx
// app/components/MDXComponents.tsx
import { Callout } from './mdx/Callout'
import { CodeBlock } from './mdx/CodeBlock'
import { ImageZoom } from './mdx/ImageZoom'
import { ExternalLink } from './mdx/ExternalLink'

export const MDXComponents = {
  // 原生元素增強
  h1: props => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: props => <h2 className="text-2xl font-bold mt-8 mb-3" {...props} />,
  h3: props => <h3 className="text-xl font-bold mt-6 mb-3" {...props} />,
  p: props => <p className="my-4 leading-relaxed" {...props} />,
  a: ExternalLink,
  img: ImageZoom,
  
  // 自定義MDX組件
  Callout,
  CodeBlock,
}
```

### 4.3 自定義組件示例

#### Callout組件

```tsx
// app/components/mdx/Callout.tsx
interface CalloutProps {
  children: React.ReactNode
  type?: 'info' | 'warning' | 'success' | 'error'
}

export function Callout({ children, type = 'info' }: CalloutProps) {
  const styles = {
    info: 'bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300',
    warning: 'bg-yellow-50 border-yellow-300 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300',
    success: 'bg-green-50 border-green-300 text-green-900 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300',
    error: 'bg-red-50 border-red-300 text-red-900 dark:bg-red-900/20 dark:border-red-700 dark:text-red-300',
  }
  
  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  }
  
  return (
    <div className={`p-4 my-6 border-l-4 rounded-r ${styles[type]}`}>
      <div className="flex items-start">
        <span className="mr-3 text-xl">{icons[type]}</span>
        <div>{children}</div>
      </div>
    </div>
  )
}
```

#### CodeBlock組件

```tsx
// app/components/mdx/CodeBlock.tsx
'use client'

import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  children: string
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative my-6">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded text-xs bg-gray-800 text-gray-300"
      >
        {copied ? '已複製!' : '複製'}
      </button>
      <SyntaxHighlighter 
        language={language} 
        style={vscDarkPlus}
        className="rounded-md"
      >
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
```

## 5. TDD最佳實踐規格

### 5.1 測試目錄結構

```
__tests__/
├── components/        # 組件測試
├── lib/               # 工具函數測試
├── pages/             # 頁面測試
└── e2e/               # 端到端測試
```

### 5.2 測試策略

針對不同類型的代碼採用不同的測試方法：

- **UI組件**: 使用React Testing Library測試渲染和互動
- **MDX組件**: 測試自定義MDX組件的渲染和功能
- **工具函數**: 單元測試確保功能正確性
- **頁面集成**: 測試頁面組件的組合和數據流
- **E2E測試**: 使用Playwright或Cypress測試完整用戶流程

### 5.3 測試示例

#### UI組件測試

```tsx
// __tests__/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/app/components/ui/Button'

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600')
  })
  
  it('renders correctly with custom variant', () => {
    render(<Button variant="secondary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gray-600')
  })
  
  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### MDX組件測試

```tsx
// __tests__/components/mdx/Callout.test.tsx
import { render, screen } from '@testing-library/react'
import { Callout } from '@/app/components/mdx/Callout'

describe('Callout', () => {
  it('renders correctly with default props', () => {
    render(<Callout>Test message</Callout>)
    expect(screen.getByText('Test message')).toBeInTheDocument()
    // 檢查默認類型為info
    const container = screen.getByText('Test message').closest('div').parentElement
    expect(container).toHaveClass('bg-blue-50')
  })
  
  it('renders correctly with warning type', () => {
    render(<Callout type="warning">Warning message</Callout>)
    expect(screen.getByText('Warning message')).toBeInTheDocument()
    const container = screen.getByText('Warning message').closest('div').parentElement
    expect(container).toHaveClass('bg-yellow-50')
  })
})
```

#### 工具函數測試

```tsx
// __tests__/lib/mdx.test.ts
import { getAllArticles, getArticleBySlug } from '@/lib/mdx'
import fs from 'fs'
import path from 'path'

// 模擬文件系統
jest.mock('fs')
jest.mock('path')

describe('MDX library functions', () => {
  beforeEach(() => {
    // 模擬文件系統設置
    const mockFiles = ['post-1.mdx', 'post-2.mdx']
    fs.readdirSync.mockReturnValue(mockFiles)
    
    const mockFileContent = `---
title: Test Article
date: 2025-05-08
published: true
---
Test content`
    
    fs.readFileSync.mockReturnValue(mockFileContent)
    path.join.mockImplementation((...args) => args.join('/'))
  })
  
  it('getAllArticles returns correct articles', async () => {
    const articles = getAllArticles()
    expect(articles).toHaveLength(2)
    expect(articles[0].title).toBe('Test Article')
    expect(articles[0].slug).toBe('post-1')
  })
  
  it('getArticleBySlug returns correct article', async () => {
    const article = await getArticleBySlug('post-1')
    expect(article.slug).toBe('post-1')
    expect(article.frontmatter.title).toBe('Test Article')
  })
})
```

## 6. 開發進度計劃

### 6.1 第一階段實施步驟

1. **設置基礎項目結構** (1天)
   - 配置Next.js 15專案
   - 設置Tailwind CSS
   - 配置測試環境

2. **開發核心布局與導航** (2天)
   - 實現根布局
   - 開發導航組件，確保包含「關於我」與「我的文章」選項
   - 實現響應式布局基礎

3. **實現MDX內容系統** (2天)
   - 配置MDX處理流程
   - 創建內容目錄結構
   - 開發MDX解析和渲染工具

4. **開發自定義組件系統** (3天)
   - 創建UI基礎組件
   - 實現MDX增強組件
   - 開發部落格專用組件

5. **構建基礎頁面** (2天)
   - 實現首頁
   - 開發「關於我」頁面
   - 創建文章列表頁

### 6.2 測試覆蓋計劃

- 每個新組件必須有對應的測試用例
- 維持至少80%的測試覆蓋率
- 進行定期的E2E測試以確保整體功能

## 7. 下一步行動

- 創建項目基礎架構
- 實現核心導航組件
- 建立MDX內容管理系統基礎
- 開發第一批自定義UI組件
- 建立TDD工作流程並添加初始測試

根據此技術規格，我們將進入開發階段，開始實現Clay個人部落格的第一階段功能。