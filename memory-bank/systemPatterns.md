# System Patterns

這個檔案記錄專案中的重復模式和標準。此檔案為可選，但建議隨著專案演進定期更新。
2025-05-08 14:39:00 - 初始化Memory Bank。
2025-05-08 14:49:00 - 更新為Clay個人部落格專案。

*

## Coding Patterns

* **MDX內容處理**：處理MDX檔案的標準模式
  ```tsx
  // MDX內容獲取模式
  import { getArticleBySlug } from '@/lib/mdx';
  
  export async function generateStaticParams() {
    // 獲取所有文章以生成靜態路由
    return getAllArticles().map(article => ({ slug: article.slug }));
  }
  
  export default async function ArticlePage({ params }) {
    const { slug } = params;
    const article = await getArticleBySlug(slug);
    return <ArticleLayout article={article} />;
  }
  ```

* **自定義MDX組件**：擴展MDX功能的標準模式
  ```tsx
  // MDX組件映射
  const components = {
    // 基本元素增強
    h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
    
    // 自定義組件
    Callout: ({ children, type = 'info' }) => (
      <div className={`callout callout-${type}`}>{children}</div>
    ),
    
    // 交互式元素
    CodeBlock: ({ code, language }) => (
      <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
    )
  };
  
  // MDX使用
  function MDXContent({ content }) {
    return <MDXRemote {...content} components={components} />;
  }
  ```

* **響應式組件設計**：構建適應多種屏幕尺寸的組件
  ```tsx
  // 響應式組件示例
  function ResponsiveNavigation() {
    return (
      <nav>
        {/* 行動裝置摺疊選單 */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
        
        {/* 桌面裝置導航選單 */}
        <div className="hidden md:flex">
          <DesktopMenu />
        </div>
      </nav>
    );
  }
  ```

## Architectural Patterns

* **部落格內容架構**：使用基於檔案系統的內容管理
  ```
  content/
    blog/
      [year]/
        [month]/
          article-slug.mdx
    pages/
      about.mdx
  ```

* **組件層次結構**：明確的組件分層設計
  ```
  components/
    layouts/           # 布局組件
      MainLayout.tsx   # 主布局
      ArticleLayout.tsx # 文章布局
    ui/                # UI基礎組件
      Button.tsx
      Card.tsx
    mdx/               # MDX增強組件
      CodeBlock.tsx
      Callout.tsx
    blog/              # 部落格專用組件
      ArticleCard.tsx
      TableOfContents.tsx
  ```

* **路由架構**：基於內容的路由設計
  ```
  app/
    layout.tsx         # 根布局
    page.tsx           # 首頁
    about/             # 關於頁面
      page.tsx
    blog/              # 部落格區域
      page.tsx         # 文章列表
      [slug]/          # 動態文章路由
        page.tsx
  ```

## Testing Patterns

* **測試驅動開發流程**：遵循TDD原則
  ```
  1. 編寫測試用例
  2. 確認測試失敗
  3. 實現最小功能使測試通過
  4. 重構改進代碼
  5. 重複以上步驟
  ```

* **組件測試模式**：
  ```tsx
  // UI組件測試範例
  import { render, screen } from '@testing-library/react';
  import Button from './Button';
  
  describe('Button component', () => {
    it('renders with default props', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });
    
    it('handles click events', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      screen.getByRole('button').click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
  ```

* **MDX組件測試模式**：
  ```tsx
  // MDX組件測試
  import { render } from '@testing-library/react';
  import { MDXRemote } from 'next-mdx-remote';
  import { components } from './mdx-components';
  
  describe('MDX components', () => {
    it('renders Callout component correctly', () => {
      const mdxContent = {
        compiledSource: "/*@jsxRuntime automatic @jsxImportSource react*/\nReact.createElement(components.Callout, { type: \"info\" }, \"This is a callout\");"
      };
      
      render(<MDXRemote {...mdxContent} components={components} />);
      expect(screen.getByText('This is a callout')).toBeInTheDocument();
      expect(screen.getByText('This is a callout').closest('div')).toHaveClass('callout', 'callout-info');
    });
  });
  ```