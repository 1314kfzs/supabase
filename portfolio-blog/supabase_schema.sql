-- Portfolio Blog - Supabase数据库表结构
-- 创建表结构和插入示例数据

-- 1. 用户资料表
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    skills TEXT[], -- 技能标签数组
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 项目表
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    detailed_description TEXT, -- 详细描述（Markdown格式）
    category VARCHAR(50) NOT NULL, -- 项目分类
    cover_image TEXT, -- 封面图片
    images TEXT[], -- 项目图片数组
    technologies TEXT[] NOT NULL, -- 技术栈数组
    status VARCHAR(20) CHECK (status IN ('planned', 'in-progress', 'completed', 'on-hold')) NOT NULL,
    start_date DATE,
    end_date DATE,
    github_url TEXT,
    demo_url TEXT,
    project_url TEXT,
    featured BOOLEAN DEFAULT FALSE, -- 是否特色项目
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 博客文章表
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL, -- URL友好的别名
    excerpt TEXT, -- 摘要
    content TEXT NOT NULL, -- 文章内容（Markdown格式）
    image_url TEXT, -- 封面图片
    published BOOLEAN DEFAULT FALSE, -- 是否发布
    view_count INTEGER DEFAULT 0, -- 浏览量
    tags TEXT[], -- 标签数组
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引以提高查询性能
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX idx_blog_posts_user_id ON blog_posts(user_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- 更新时间戳的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为每个表创建触发器
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 插入示例数据
-- 1. 插入用户资料
INSERT INTO profiles (id, username, full_name, email, bio, skills, avatar_url) VALUES
('00000000-0000-0000-0000-000000000001', 'zhangsan', '张三', 'zhangsan@example.com', 
 '资深全栈开发者，专注于React、TypeScript和Node.js技术栈。热爱开源，乐于分享技术经验。',
 '{"React", "TypeScript", "Node.js", "Vue.js", "Python", "Docker", "Kubernetes", "PostgreSQL", "MongoDB"}',
 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face');

-- 2. 插入项目数据（基于现有页面数据）
INSERT INTO projects (id, user_id, title, description, detailed_description, category, cover_image, images, technologies, status, start_date, end_date, github_url, demo_url, featured) VALUES
('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 
 '个人博客系统', '基于React和Node.js的全栈博客系统',
 '## 项目概述

Gatsby Ghost Starter 是一个基于 Gatsby 和 Ghost 的现代化博客系统。Ghost 是一个专注于内容创作的开源发布平台，
而 Gatsby 则是一个基于 React 的静态站点生成器，两者结合提供了极佳的性能和用户体验。

## 主要功能

- **静态站点生成**: 使用 Gatsby 将 Ghost 内容预渲染为静态 HTML
- **内容管理**: 通过 Ghost 后台进行内容创作和管理
- **响应式设计**: 完美适配桌面端和移动端
- **SEO 优化**: 内置 SEO 最佳实践和结构化数据
- **快速加载**: 利用 Gatsby 的代码分割和预加载技术

## 技术栈

- **前端**: Gatsby, React, GraphQL, Styled Components
- **后端**: Ghost CMS, Node.js
- **部署**: Netlify, Vercel, Ghost(Pro)

## 项目亮点

- 极快的加载速度和优秀的性能表现
- 与 Ghost 原生功能完美集成
- 支持多种部署方式和托管平台
- 活跃的社区支持和持续更新',
 'React', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
 '{"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop"}',
 '{"Gatsby", "React", "Ghost", "GraphQL", "Styled Components"}', 'completed', '2023-01-01', '2023-06-30',
 'https://github.com/tryghost/gatsby-starter-ghost', 'https://www.freedidi.com/', TRUE),

('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001',
 '电商平台', '完整的电商购物平台',
 '## 项目概述

Shopify Quilt 是 Shopify 的开源 JavaScript 工具库集合，为构建现代化的电商应用提供了一系列高质量的开发工具和组件。
这些工具涵盖了状态管理、测试工具、开发工具等多个方面，帮助开发者构建可维护的电商应用。

## 主要功能

- **状态管理**: 提供 React 状态管理工具和模式
- **测试工具**: 包含完整的测试工具链和最佳实践
- **开发工具**: 提供开发时调试和优化工具
- **组件库**: 包含可复用的 UI 组件和设计系统

## 技术栈

- **前端**: React, TypeScript, GraphQL
- **测试**: Jest, Testing Library, Cypress
- **工具**: Webpack, Babel, ESLint

## 项目亮点

- 由 Shopify 团队维护，具有企业级质量
- 与 Shopify 生态系统深度集成
- 提供完整的开发工具链
- 遵循现代前端开发最佳实践',
 'React', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
 '{"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop"}',
 '{"React", "TypeScript", "GraphQL", "Jest", "Webpack"}', 'completed', '2022-03-01', '2022-12-31',
 'https://github.com/shopify/quilt', 'https://www.macrozheng.com/admin/', TRUE),

('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001',
 'TypeScript全栈API服务', '基于TypeScript的RESTful API服务与前端管理台，支持数据校验、权限控制',
 '## 项目概述

NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。它使用 TypeScript 构建，
并完全支持 TypeScript，同时允许开发者使用纯 JavaScript。NestJS 结合了 OOP（面向对象编程）、
FP（函数式编程）和 FRP（函数式响应式编程）的元素。

## 主要功能

- **依赖注入**: 内置强大的依赖注入容器
- **模块化架构**: 模块化设计，易于组织和扩展
- **中间件支持**: 完整的中间件支持，兼容 Express 中间件
- **WebSocket 支持**: 内置 WebSocket 支持，实现实时应用
- **数据库集成**: 支持多种数据库 ORM，包括 TypeORM、Prisma 等

## 技术栈

- **后端**: NestJS, TypeScript, Prisma
- **数据库**: PostgreSQL, MySQL
- **部署**: Docker, Kubernetes

## 项目亮点

- 企业级框架，适合大型项目开发
- 完整的 TypeScript 支持，提供类型安全
- 丰富的生态系统和活跃的社区
- 遵循 Angular 的设计理念，学习曲线平滑',
 'TypeScript', 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&h=600&fit=crop',
 '{"https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&h=600&fit=crop"}',
 '{"TypeScript", "NestJS", "Prisma", "PostgreSQL", "Docker"}', 'completed', '2023-07-01', '2023-10-31',
 'https://github.com/nestjs/nest', 'https://nestjs.com/docs', TRUE),

('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001',
 '数据可视化仪表板', '实时数据监控和分析平台',
 '## 项目概述

Nivo 是一个基于 D3.js 和 React 的现代数据可视化库，提供了丰富的图表组件和强大的交互功能。
它专注于为 React 应用提供优雅、高性能的可视化解决方案。

## 主要功能

- **图表类型**: 支持柱状图、折线图、饼图、热力图等多种图表
- **交互功能**: 支持鼠标悬停、点击、缩放等交互操作
- **动画效果**: 内置流畅的过渡动画效果
- **响应式设计**: 自动适配不同屏幕尺寸

## 技术栈

- **可视化**: D3.js, React
- **动画**: React Spring
- **工具**: Webpack, TypeScript

## 项目亮点

- 基于 D3.js 的强大功能，同时提供 React 友好的 API
- 丰富的图表类型和定制选项
- 优秀的性能和流畅的动画效果
- 活跃的社区和持续更新',
 'React', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
 '{"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop", "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop"}',
 '{"React", "D3.js", "TypeScript", "React Spring", "Webpack"}', 'in-progress', '2023-02-01', NULL,
 'https://github.com/nivo/nivo', 'https://nivo.rocks/', FALSE);

-- 3. 插入博客文章数据
INSERT INTO blog_posts (id, user_id, title, slug, excerpt, content, image_url, published, view_count, tags, published_at) VALUES
('00000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000001',
 'React Hooks 最佳实践指南', 'react-hooks-best-practices',
 '深入探讨React Hooks的使用技巧和最佳实践，帮助开发者写出更优雅的React代码。',
 '# React Hooks 最佳实践指南

## 引言

React Hooks 自16.8版本引入以来，彻底改变了React开发方式。本文将分享一些实用的Hooks使用技巧和最佳实践。

## 核心Hooks使用

### useState

```javascript
const [state, setState] = useState(initialValue);
```

### useEffect

```javascript
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  };
}, [dependencies]);
```

## 自定义Hooks

创建可复用的自定义Hooks可以大大提高代码复用性。

## 性能优化

- 使用useMemo缓存计算结果
- 使用useCallback缓存函数引用
- 合理使用依赖数组

## 总结

掌握Hooks的使用技巧是成为React高手的关键一步。',
 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
 TRUE, 156, '{"React", "Hooks", "最佳实践", "JavaScript"}', '2024-01-15 10:00:00'),

('00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000001',
 'TypeScript与React的完美结合', 'typescript-react-integration',
 '探索TypeScript如何与React结合，提供类型安全的前端开发体验。',
 '# TypeScript与React的完美结合

## TypeScript的优势

TypeScript为React开发带来了以下优势：

1. **类型安全**: 编译时类型检查
2. **更好的IDE支持**: 智能提示和自动补全
3. **代码可维护性**: 清晰的接口定义
4. **团队协作**: 减少沟通成本

## 配置TypeScript

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true
  }
}
```

## 常用类型定义

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>;
};
```

## 总结

TypeScript与React的结合是现代前端开发的最佳实践。',
 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
 TRUE, 89, '{"TypeScript", "React", "前端开发", "类型安全"}', '2024-01-10 14:30:00'),

('00000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000001',
 'Node.js微服务架构设计', 'nodejs-microservices-architecture',
 '深入探讨基于Node.js的微服务架构设计原则和实现方案。',
 '# Node.js微服务架构设计

## 微服务架构优势

- 服务解耦
- 独立部署
- 技术栈多样性
- 弹性伸缩

## 架构设计原则

1. **单一职责原则**
2. **服务自治**
3. **API网关模式**
4. **服务发现机制**

## 技术栈选择

- Express.js/Fastify
- Docker & Kubernetes
- Redis缓存
- RabbitMQ消息队列

## 监控与日志

完善的监控和日志系统是微服务架构的保障。

## 总结

微服务架构需要综合考虑业务需求和技术选型。',
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
 TRUE, 67, '{"Node.js", "微服务", "架构设计", "Docker"}', '2024-01-05 09:15:00');

-- 启用行级安全策略（RLS）
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 创建访问策略
-- 允许所有用户读取资料（可以根据需要调整）
CREATE POLICY "允许所有人读取资料" ON profiles FOR SELECT USING (true);
CREATE POLICY "允许所有人读取项目" ON projects FOR SELECT USING (true);
CREATE POLICY "允许所有人读取博客文章" ON blog_posts FOR SELECT USING (true);