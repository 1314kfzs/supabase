# PortfolioBlog - 个人作品集 + 博客系统

一个现代化的个人作品展示和技术博客分享平台，基于 React + TypeScript + Supabase 技术栈构建。

## 🌟 项目特色

- **全栈应用**: 集成前端展示与后端数据管理
- **现代化技术栈**: React 18 + TypeScript + Tailwind CSS
- **响应式设计**: 完美适配移动端和桌面端
- **用户认证**: 完整的登录注册系统
- **实时数据**: 基于 Supabase 的实时数据库
- **部署就绪**: 支持 Netlify 一键部署

## 🚀 快速开始

### 环境要求

- Node.js 16+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env` 文件并配置：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
src/
├── components/          # 可复用组件
│   ├── Layout/         # 布局组件
│   ├── UI/             # UI组件库
│   └── Common/         # 通用组件
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── ProjectsPage.tsx # 作品集
│   ├── BlogPage.tsx    # 博客列表
│   ├── BlogPostPage.tsx # 博客详情
│   ├── LoginPage.tsx   # 登录页
│   └── RegisterPage.tsx # 注册页
├── hooks/              # 自定义Hooks
│   ├── useAuth.ts      # 认证Hook
│   ├── useProjects.ts  # 项目数据Hook
│   └── useBlogPosts.ts # 博客数据Hook
├── stores/             # 状态管理
│   └── authStore.ts    # 认证状态
├── lib/                # 工具库
│   └── supabase.ts     # Supabase配置
├── types/              # TypeScript类型定义
└── styles/             # 样式文件
```

## 🎯 核心功能

### 首页 (/)
- 个人简介展示
- 特色项目轮播
- 最新博客文章预览
- 技能标签云
- 社交链接入口

### 作品集 (/projects)
- 响应式项目网格布局
- 技术栈筛选功能
- 关键词搜索
- 项目详情模态框
- 分页浏览

### 博客 (/blog)
- 文章列表按时间排序
- 分类筛选功能
- 关键词搜索
- 文章详情页
- Markdown内容渲染

### 用户认证
- 用户注册/登录
- 会话状态管理
- 安全退出
- 认证状态监听

## 🛠 技术栈

### 前端
- **React 18** - 现代化React框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **React Router** - 单页应用路由管理

### 状态管理
- **Zustand** - 轻量级状态管理
- **TanStack Query** - 数据获取和缓存

### 后端服务
- **Supabase** - 后端即服务
  - 用户认证管理
  - 实时数据库
  - 文件存储
  - 安全策略

### 部署
- **Netlify** - 静态站点部署
- **Vite** - 现代化构建工具

## 📦 部署指南

### 1. Supabase 配置
1. 创建 Supabase 项目
2. 配置数据库表结构（参考 DEPLOYMENT.md）
3. 设置环境变量

### 2. Netlify 部署
1. 构建项目：`npm run build`
2. 将 dist 文件夹拖拽到 Netlify
3. 配置环境变量

### 3. 自定义域名（可选）
1. 在 Netlify 添加自定义域名
2. 配置 DNS 记录

## 🔧 开发指南

### 添加新项目
编辑 `src/pages/ProjectsPage.tsx` 中的示例数据，或连接真实的 Supabase 数据库。

### 添加新博客文章
编辑 `src/pages/BlogPage.tsx` 中的示例数据，或通过 Supabase 管理界面添加。

### 自定义样式
修改 `src/index.css` 中的 Tailwind 配置和自定义样式。

## 📚 文档

- [部署教程](./DEPLOYMENT.md) - 详细部署指南
- [功能说明](./FEATURES.md) - 完整功能说明

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

---

**PortfolioBlog** - 展示你的技术，分享你的故事