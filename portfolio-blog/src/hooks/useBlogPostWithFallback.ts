import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'
import { BlogPost } from '../types'

// Mock data for fallback
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'React Hooks 最佳实践',
    slug: 'react-hooks-最佳实践',
    content: `
      <h2>引言</h2>
      <p>React Hooks 自 16.8 版本引入以来，彻底改变了我们编写 React 组件的方式。它们让我们能够在函数组件中使用状态和其他 React 特性，而无需编写类组件。然而，随着 Hooks 的普及，我们也遇到了一些常见的陷阱和最佳实践。</p>
      
      <h2>useState 的最佳实践</h2>
      <p>useState 是最常用的 Hook 之一，用于在函数组件中添加状态。以下是一些最佳实践：</p>
      
      <h3>1. 函数式更新</h3>
      <p>当新的状态依赖于旧的状态时，应该使用函数式更新：</p>
      
      <pre><code>const [count, setCount] = useState(0)

// 错误的方式
setCount(count + 1)

// 正确的方式
setCount(prevCount => prevCount + 1)</code></pre>
      
      <h3>2. 状态合并</h3>
      <p>当有多个相关联的状态时，考虑将它们合并到一个对象中：</p>
      
      <pre><code>const [user, setUser] = useState({
        name: '',
        email: '',
        age: 0
      })

// 更新部分状态
setUser(prev => ({ ...prev, name: 'John' }))</code></pre>
      
      <h2>useEffect 的注意事项</h2>
      <p>useEffect 用于处理副作用，但如果不正确使用，可能会导致性能问题：</p>
      
      <h2>自定义 Hooks</h2>
      <p>自定义 Hooks 让我们能够提取可重用的状态逻辑，提高代码复用性。</p>
      
      <h2>总结</h2>
      <p>React Hooks 提供了强大的能力，但也需要遵循最佳实践来避免常见陷阱。</p>
    `,
    excerpt: 'React Hooks 自 16.8 版本引入以来，彻底改变了我们编写 React 组件的方式。它们让我们能够在函数组件中使用状态和其他 React 特性，而无需编写类组件。',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    published: true,
    tags: ['React', 'Hooks', '前端', '最佳实践'],
    view_count: 128,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    published_at: '2024-01-15T00:00:00Z',
    user_id: '1'
  },
  {
    id: '2',
    title: 'TypeScript 类型系统详解',
    slug: 'typescript-类型系统详解',
    content: `
      <h2>TypeScript 类型系统概述</h2>
      <p>TypeScript 的类型系统是其最强大的特性之一，提供了静态类型检查、接口、泛型等高级特性。</p>
      
      <h2>基础类型</h2>
      <p>TypeScript 支持 JavaScript 的所有基础类型，并增加了枚举、元组等类型。</p>
      
      <h2>接口和类型别名</h2>
      <p>接口和类型别名让我们能够定义复杂的对象结构，提高代码的可读性和可维护性。</p>
      
      <h2>泛型编程</h2>
      <p>泛型允许我们创建可重用的组件，这些组件可以支持多种类型，同时保持类型安全。</p>
    `,
    excerpt: 'TypeScript 的类型系统是其最强大的特性之一，提供了静态类型检查、接口、泛型等高级特性。',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
    published: true,
    tags: ['TypeScript', '类型系统', '前端'],
    view_count: 95,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    published_at: '2024-01-10T00:00:00Z',
    user_id: '1'
  },
  {
    id: '3',
    title: 'Node.js 性能优化指南',
    slug: 'nodejs-性能优化指南',
    content: `
      <h2>Node.js 性能优化概述</h2>
      <p>Node.js 作为服务端 JavaScript 运行时，性能优化是开发高性能应用的关键。</p>
      
      <h2>内存管理</h2>
      <p>合理的内存管理可以避免内存泄漏，提高应用稳定性。</p>
      
      <h2>异步处理优化</h2>
      <p>利用异步编程模式，避免阻塞事件循环，提高并发处理能力。</p>
      
      <h2>监控和调试工具</h2>
      <p>使用各种监控工具来识别性能瓶颈，进行针对性优化。</p>
    `,
    excerpt: 'Node.js 作为服务端 JavaScript 运行时，性能优化是开发高性能应用的关键。',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    published: true,
    tags: ['Node.js', '性能优化', '后端'],
    view_count: 87,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    published_at: '2024-01-05T00:00:00Z',
    user_id: '1'
  },
  {
    id: '4',
    title: 'PostgreSQL 数据库设计模式',
    slug: 'postgresql-数据库设计模式',
    content: `
      <h2>PostgreSQL 数据库设计</h2>
      <p>PostgreSQL 作为功能强大的开源关系数据库，其设计模式直接影响应用性能。</p>
      
      <h2>索引优化策略</h2>
      <p>合理的索引设计可以显著提高查询性能，减少数据库负载。</p>
      
      <h2>表结构设计</h2>
      <p>规范化的表结构设计有助于数据一致性和查询效率。</p>
      
      <h2>查询优化技巧</h2>
      <p>掌握 SQL 查询优化技巧，编写高效的数据库查询语句。</p>
    `,
    excerpt: 'PostgreSQL 作为功能强大的开源关系数据库，其设计模式直接影响应用性能。',
    image_url: 'https://images.unsplash.com/photo-1618788372246-79faff0c3742?w=400&h=300&fit=crop',
    published: true,
    tags: ['PostgreSQL', '数据库', '后端'],
    view_count: 142,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    published_at: '2024-01-01T00:00:00Z',
    user_id: '1'
  },
  {
    id: '5',
    title: 'Docker容器化部署实战',
    slug: 'docker容器化部署实战',
    content: `
      <h2>Docker 容器化部署</h2>
      <p>Docker 提供了轻量级的容器化解决方案，简化了应用的部署和管理。</p>
      
      <h2>多阶段构建</h2>
      <p>使用多阶段构建可以减少镜像大小，提高安全性。</p>
      
      <h2>网络配置</h2>
      <p>合理的网络配置确保容器间的通信安全和高效。</p>
      
      <h2>编排工具使用</h2>
      <p>结合 Docker Compose 或 Kubernetes 实现复杂应用的编排部署。</p>
    `,
    excerpt: 'Docker 提供了轻量级的容器化解决方案，简化了应用的部署和管理。',
    image_url: 'https://images.unsplash.com/photo-1629904853893-c2c8981a1c5f?w=800&h=600&fit=crop',
    published: true,
    tags: ['Docker', 'DevOps', '部署'],
    view_count: 210,
    created_at: '2023-12-28T00:00:00Z',
    updated_at: '2023-12-28T00:00:00Z',
    published_at: '2023-12-28T00:00:00Z',
    user_id: '1'
  },
  {
    id: '6',
    title: '前端工程化建设指南',
    slug: '前端工程化建设指南',
    content: `
      <h2>前端工程化概述</h2>
      <p>前端工程化是现代前端开发的重要环节，涉及构建、测试、部署等多个方面。</p>
      
      <h2>构建工具选择</h2>
      <p>根据项目需求选择合适的构建工具，如 Webpack、Vite 等。</p>
      
      <h2>代码规范和质量</h2>
      <p>建立统一的代码规范和质量检查流程，确保代码质量。</p>
      
      <h2>自动化测试</h2>
      <p>实施自动化测试策略，提高代码的可靠性和可维护性。</p>
    `,
    excerpt: '前端工程化是现代前端开发的重要环节，涉及构建、测试、部署等多个方面。',
    image_url: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?w=800&h=600&fit=crop',
    published: true,
    tags: ['前端', '工程化', '构建工具'],
    view_count: 176,
    created_at: '2023-12-25T00:00:00Z',
    updated_at: '2023-12-25T00:00:00Z',
    published_at: '2023-12-25T00:00:00Z',
    user_id: '1'
  }
]

export const useBlogPostWithFallback = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post-with-fallback', slug],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.BLOG_POSTS)
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single()
        
        if (error) throw error
        return data as BlogPost
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        const post = mockBlogPosts.find(post => post.slug === slug)
        if (post) {
          return post
        }
        throw new Error('博客文章未找到')
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}