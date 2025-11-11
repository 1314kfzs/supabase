# PortfolioBlog 部署教程

## 项目概述

PortfolioBlog 是一个集个人作品展示和技术博客分享于一体的全栈Web应用，使用 React + TypeScript + Supabase 技术栈构建。

## 部署准备

### 1. Supabase 数据库配置

1. 访问 [Supabase](https://supabase.com) 并创建新项目
2. 获取项目 URL 和 anon key
3. 在项目根目录创建 `.env` 文件，添加以下内容：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. 数据库表结构

在 Supabase SQL 编辑器中执行以下 SQL 语句创建表结构：

```sql·
-- 创建用户信息表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  email TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  personal_website TEXT,
  skills TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建项目表
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  detailed_description TEXT,
  cover_image TEXT,
  images TEXT[],
  project_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  technologies TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'completed',
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL
);

-- 创建博客文章表
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  read_time INTEGER,
  tags TEXT[],
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL
);

-- 启用行级安全策略
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 创建安全策略
-- profiles 表策略
CREATE POLICY "用户可查看所有资料" ON profiles FOR SELECT USING (true);
CREATE POLICY "用户可更新自己的资料" ON profiles FOR UPDATE USING (auth.uid() = id);

-- projects 表策略
CREATE POLICY "所有人可查看项目" ON projects FOR SELECT USING (true);
CREATE POLICY "用户可管理自己的项目" ON projects FOR ALL USING (auth.uid() = user_id);

-- blog_posts 表策略
CREATE POLICY "所有人可查看已发布文章" ON blog_posts FOR SELECT USING (published = true OR auth.uid() = user_id);
CREATE POLICY "用户可管理自己的文章" ON blog_posts FOR ALL USING (auth.uid() = user_id);
```

## 本地开发

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

应用将在 http://localhost:3000 启动

## 部署到 Netlify

### 1. 构建项目
```bash
npm run build
```

### 2. 部署到 Netlify

#### 方法一：通过 Git 部署
1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中连接 GitHub 仓库
3. 设置构建命令：`npm run build`
4. 设置发布目录：`dist`
5. 添加环境变量：
   - `VITE_SUPABASE_URL`: 你的 Supabase 项目 URL
   - `VITE_SUPABASE_ANON_KEY`: 你的 Supabase anon key

#### 方法二：拖拽部署
1. 运行 `npm run build` 生成 dist 文件夹
2. 将 dist 文件夹拖拽到 Netlify 部署区域
3. 在 Netlify 设置中添加环境变量

### 3. 自定义域名（可选）
1. 在 Netlify 域名设置中添加自定义域名
2. 配置 DNS 记录指向 Netlify

## 环境变量配置

### 开发环境 (.env)
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 生产环境 (Netlify)
在 Netlify 项目设置中配置：
- `VITE_SUPABASE_URL`: 你的 Supabase 项目 URL
- `VITE_SUPABASE_ANON_KEY`: 你的 Supabase anon key

## 故障排除

### 常见问题

1. **构建失败**
   - 检查环境变量是否正确配置
   - 确保所有依赖已正确安装

2. **数据库连接失败**
   - 检查 Supabase 项目 URL 和 anon key
   - 确认数据库表结构和策略已正确设置

3. **页面空白**
   - 检查浏览器控制台错误信息
   - 确认路由配置正确

### 技术支持

如果遇到问题，请检查：
- 项目文档和 README
- Supabase 官方文档
- Netlify 部署指南

## 版本更新

### 更新依赖
```bash
npm update
```

### 重新部署
每次代码更新后，Netlify 会自动重新部署（如果使用 Git 部署）

---

**注意**: 部署前请确保所有环境变量已正确配置，数据库表结构已创建，安全策略已设置。