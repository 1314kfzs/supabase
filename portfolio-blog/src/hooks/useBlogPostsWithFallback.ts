import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'

// Define the BlogPost type locally
interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  image_url?: string
  published: boolean
  read_time?: number
  tags: string[]
  view_count: number
  created_at: string
  updated_at: string
  published_at?: string
  user_id: string
}

// Mock data for fallback
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'React Hooks 最佳实践指南',
    slug: 'react-hooks-best-practices',
    content: `
      <h2>React Hooks 最佳实践指南</h2>

      <h3>引言</h3>
      <p>React Hooks 自16.8版本引入以来，彻底改变了React开发方式。本文将分享一些实用的Hooks使用技巧和最佳实践。</p>

      <h3>核心Hooks使用</h3>
      <p><strong>useState</strong></p>
      <pre><code>const [state, setState] = useState(initialValue);</code></pre>
      
      <p><strong>useEffect</strong></p>
      <pre><code>useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  };
}, [dependencies]);</code></pre>

      <h3>自定义Hooks</h3>
      <p>创建可复用的自定义Hooks可以大大提高代码复用性。</p>

      <h3>性能优化</h3>
      <ul>
        <li>使用useMemo缓存计算结果</li>
        <li>使用useCallback缓存函数引用</li>
        <li>合理使用依赖数组</li>
      </ul>

      <h3>总结</h3>
      <p>掌握Hooks的使用技巧是成为React高手的关键一步。</p>
    `,
    excerpt: '深入探讨React Hooks的使用技巧和最佳实践，帮助开发者写出更优雅的React代码。',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
    published: true,
    tags: ['React', 'Hooks', '最佳实践', 'JavaScript'],
    view_count: 156,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    published_at: '2024-01-15T00:00:00Z',
    user_id: '1'
  },
  {
    id: '2',
    title: 'TypeScript与React的完美结合',
    slug: 'typescript-react-integration',
    content: `
      <h2>TypeScript与React的完美结合</h2>

      <h3>TypeScript的优势</h3>
      <p>TypeScript为React开发带来了以下优势：</p>
      <ol>
        <li><strong>类型安全</strong>: 编译时类型检查</li>
        <li><strong>更好的IDE支持</strong>: 智能提示和自动补全</li>
        <li><strong>代码可维护性</strong>: 清晰的接口定义</li>
        <li><strong>团队协作</strong>: 减少沟通成本</li>
      </ol>

      <h3>配置TypeScript</h3>
      <pre><code>{
  "compilerOptions": {
    "jsx": "react-jsx",
    "strict": true
  }
}</code></pre>

      <h3>常用类型定义</h3>
      <pre><code>interface User {
  id: number;
  name: string;
  email: string;
}

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return <div>{user.name}</div>;
};</code></pre>

      <h3>总结</h3>
      <p>TypeScript与React的结合是现代前端开发的最佳实践。</p>
    `,
    excerpt: '探索TypeScript如何与React结合，提供类型安全的前端开发体验。',
    image_url: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop',
    published: true,
    tags: ['TypeScript', 'React', '前端开发', '类型安全'],
    view_count: 89,
    created_at: '2024-01-10T00:00:00Z',
    updated_at: '2024-01-10T00:00:00Z',
    published_at: '2024-01-10T00:00:00Z',
    user_id: '1'
  },
  {
    id: '3',
    title: 'Node.js微服务架构设计',
    slug: 'nodejs-microservices-architecture',
    content: `
      <h2>Node.js微服务架构设计</h2>

      <h3>微服务架构优势</h3>
      <ul>
        <li>服务解耦</li>
        <li>独立部署</li>
        <li>技术栈多样性</li>
        <li>弹性伸缩</li>
      </ul>

      <h3>架构设计原则</h3>
      <ol>
        <li><strong>单一职责原则</strong></li>
        <li><strong>服务自治</strong></li>
        <li><strong>API网关模式</strong></li>
        <li><strong>服务发现机制</strong></li>
      </ol>

      <h3>技术栈选择</h3>
      <ul>
        <li>Express.js/Fastify</li>
        <li>Docker & Kubernetes</li>
        <li>Redis缓存</li>
        <li>RabbitMQ消息队列</li>
      </ul>

      <h3>监控与日志</h3>
      <p>完善的监控和日志系统是微服务架构的保障。</p>

      <h3>总结</h3>
      <p>微服务架构需要综合考虑业务需求和技术选型。</p>
    `,
    excerpt: '深入探讨基于Node.js的微服务架构设计原则和实现方案。',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    published: true,
    tags: ['Node.js', '微服务', '架构设计', 'Docker'],
    view_count: 67,
    created_at: '2024-01-05T00:00:00Z',
    updated_at: '2024-01-05T00:00:00Z',
    published_at: '2024-01-05T00:00:00Z',
    user_id: '1'
  }
]

export const useBlogPostsWithFallback = () => {
  return useQuery({
    queryKey: ['blog-posts-with-fallback'],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.BLOG_POSTS)
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
        
        if (error) throw error
        return data as BlogPost[]
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        return mockBlogPosts
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}

export const useLatestBlogPostsWithFallback = () => {
  return useQuery({
    queryKey: ['blog-posts-with-fallback', 'latest'],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.BLOG_POSTS)
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false })
          .limit(3)
        
        if (error) throw error
        return data as BlogPost[]
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        return mockBlogPosts.slice(0, 3)
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}

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