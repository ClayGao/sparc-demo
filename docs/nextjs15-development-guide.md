# Next.js 15 開發指南

本指南整合了Next.js 15的最新開發知識，作為專案開發的參考文檔。

## 1. Next.js 15 核心更新

### 1.1 重大架構變更

#### 異步API升級
- `cookies()`, `headers()`, `params`和`searchParams`現在都是異步API
- 需要使用`await`或在客戶端組件中使用`React.use()`處理

```tsx
// 異步頁面範例
type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params
}

export default async function Page(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
}
```

#### 路由處理器的異步數據獲取

```tsx
// 在路由處理器中的異步參數處理
type Params = Promise<{ slug: string }>

export async function GET(request: Request, segmentData: { params: Params }) {
  const params = await segmentData.params
  const slug = params.slug
}
```

### 1.2 技術升級

- **React 19 支持**：完整支援React 19的新特性和性能優化
- **Turbopack穩定版**：使用`next dev --turbopack`啟動更快的開發體驗
- **緩存機制改進**：對渲染和緩存模型進行優化，`fetch`請求、`GET`路由處理程序默認不再緩存
- **配置更新**：
  ```js
  // 實驗性功能已穩定
  const nextConfig = {
    // 舊版
    experimental: {
      bundlePagesExternals: true,
    },
    // 新版
    bundlePagesRouterDependencies: true,
  }
  ```

## 2. App Router架構詳解

App Router是Next.js更先進的路由架構，提供：

- **嵌套布局**：更靈活的界面組織結構
- **平行路由**：同時在不同視圖中獲取和渲染內容
- **優化的子樹導航**：減少不必要的重新渲染
- **布局和頁面組件的異步支持**：

```tsx
// 異步布局示例
export async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // ...
}
```

## 3. 數據獲取與狀態管理

### 3.1 服務器端優化

- **改進的服務器組件**：減少客戶端JavaScript載荷
- **數據流優化**：減少瀑布效應，在單次請求中完成客戶端-服務器的REST請求

### 3.2 緩存策略

```js
// 緩存配置示例
export default async function RootLayout() {
  const a = await fetch('https://...') // 默認不緩存
  const b = await fetch('https://...', { cache: 'force-cache' }) // 啟用緩存
}

// 設置路由段緩存配置
export const fetchCache = 'default-cache'
```

## 4. 遷移與升級指南

### 4.1 自動更新

```bash
# 使用codemod自動升級
npx @next/codemod@canary upgrade latest

# 手動安裝最新依賴
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

### 4.2 處理異步API

```bash
# 使用codemod修復異步API使用
npx @next/codemod@canary next-async-request-api .
```

### 4.3 字體引入更新

```js
// 更新字體引入
// 舊版
import { Inter } from '@next/font/google'

// 新版
import { Inter } from 'next/font/google'
```

## 5. 最佳實踐

- **混合使用服務器與客戶端組件**：合理劃分職責，減少客戶端JavaScript
- **異步數據流管理**：結合React Suspense實現更順暢的用戶體驗
- **優化緩存策略**：根據數據特性選擇適當的緩存方案
- **模塊化代碼結構**：更好的代碼組織與維護性

## 6. Next.js 15與14比較

| 特性 | Next.js 15 | Next.js 14 |
|------|------------|------------|
| 渲染模型 | 異步API，簡化渲染模型 | 同步API，較複雜渲染邏輯 |
| Turbopack | 穩定版 | 實驗性功能 |
| React支持 | React 19 | React 18 |
| 緩存策略 | 更精細的緩存控制 | 基本緩存策略 |
| 配置選項 | 更穩定的API，減少實驗性標記 | 更多實驗性選項 |

## 7. 建議的開發工作流程

1. 使用TypeScript進行類型安全開發
2. 善用App Router的嵌套布局功能
3. 適當劃分服務器組件和客戶端組件
4. 實現適合項目的緩存策略
5. 採用React Suspense優化加載體驗

## 8. 程式碼範例集

### 8.1 異步Cookie/Headers API

```tsx
import { cookies } from 'next/headers'

// 舊版
const cookieStore = cookies()
const token = cookieStore.get('token')

// 新版
const cookieStore = await cookies()
const token = cookieStore.get('token')
```

```tsx
import { headers } from 'next/headers'

// 舊版
const headersList = headers()
const userAgent = headersList.get('user-agent')

// 新版
const headersList = await headers()
const userAgent = headersList.get('user-agent')
```

### 8.2 客戶端組件中的異步數據處理

```tsx
'use client'
import * as React from 'react'

function Page({ params }) {
  // 異步處理params.id
  const { id } = React.use(params)
  return <p>ID: {id}</p>
}
```

### 8.3 Next.js設定檔更新

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 舊版
  experimental: {
    serverComponentsExternalPackages: ['package-name'],
  },

  // 新版
  serverExternalPackages: ['package-name'],
}

module.exports = nextConfig
```

## 9. 深入理解Next.js 15異步渲染模型

Next.js 15對React伺服器組件的實現進行了深度整合，使開發者能夠更有效地處理伺服器端和客戶端的數據流。這一變化主要體現在：

1. **異步參數傳遞**：參數現在作為Promise對象傳遞，必須在使用時通過await解析
2. **減少渲染瀑布流**：通過並行請求數據，減少串行等待時間
3. **簡化緩存邏輯**：明確區分哪些數據需要緩存，哪些數據需要實時獲取

這種模型的轉變大大提高了應用的性能和開發人員的工作效率。

## 10. 工具和資源

- [Next.js官方文檔](https://nextjs.org/docs)
- [Next.js GitHub存儲庫](https://github.com/vercel/next.js)
- [升級工具](https://nextjs.org/docs/app/building-your-application/upgrading)

本文檔將隨著Next.js 15的更多機能發布而持續更新。