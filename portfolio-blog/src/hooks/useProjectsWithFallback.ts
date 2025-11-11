import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'

// Define the Project type locally
interface Project {
  id: string
  title: string
  description: string
  detailed_description?: string
  cover_image?: string
  images?: string[]
  project_url?: string
  github_url?: string
  demo_url?: string
  technologies: string[]
  featured: boolean
  status: 'completed' | 'in-progress' | 'planning'
  start_date?: string
  end_date?: string
  created_at: string
  updated_at: string
  user_id: string
  category?: string
}

// Mock data for fallback
const mockProjects: Project[] = [
  {
    id: '1',
    title: '个人博客系统',
    description: '基于React和Node.js的全栈博客系统',
    detailed_description: '## 项目概述\n\nGatsby Ghost Starter 是一个基于 Gatsby 和 Ghost 的现代化博客系统。Ghost 是一个专注于内容创作的开源发布平台，\n而 Gatsby 则是一个基于 React 的静态站点生成器，两者结合提供了极佳的性能和用户体验。',
    category: 'React',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
    ],
    technologies: ['Gatsby', 'React', 'Ghost', 'GraphQL', 'Styled Components'],
    status: 'completed',
    start_date: '2023-01-01',
    end_date: '2023-06-30',
    github_url: 'https://github.com/tryghost/gatsby-starter-ghost',
    demo_url: 'https://www.freedidi.com/',
    featured: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-06-30T00:00:00Z',
    user_id: '1'
  },
  {
    id: '2',
    title: '电商平台',
    description: '完整的电商购物平台',
    detailed_description: '## 项目概述\n\nShopify Quilt 是 Shopify 的开源 JavaScript 工具库集合，为构建现代化的电商应用提供了一系列高质量的开发工具和组件。\n这些工具涵盖了状态管理、测试工具、开发工具等多个方面，帮助开发者构建可维护的电商应用。',
    category: 'React',
    cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    ],
    technologies: ['React', 'TypeScript', 'GraphQL', 'Jest', 'Webpack'],
    status: 'completed',
    start_date: '2022-03-01',
    end_date: '2022-12-31',
    github_url: 'https://github.com/shopify/quilt',
    demo_url: 'https://www.macrozheng.com/admin/',
    featured: true,
    created_at: '2022-03-01T00:00:00Z',
    updated_at: '2022-12-31T00:00:00Z',
    user_id: '1'
  },
  {
    id: '3',
    title: 'TypeScript全栈API服务',
    description: '基于TypeScript的RESTful API服务与前端管理台，支持数据校验、权限控制',
    detailed_description: '## 项目概述\n\nNestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的框架。它使用 TypeScript 构建，\n并完全支持 TypeScript，同时允许开发者使用纯 JavaScript。NestJS 结合了 OOP（面向对象编程）、\nFP（函数式编程）和 FRP（函数式响应式编程）的元素。',
    category: 'TypeScript',
    cover_image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1623479322729-28b25c16b011?w=800&h=600&fit=crop'
    ],
    technologies: ['TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Docker'],
    status: 'completed',
    start_date: '2023-07-01',
    end_date: '2023-10-31',
    github_url: 'https://github.com/nestjs/nest',
    demo_url: 'https://nestjs.com/docs',
    featured: true,
    created_at: '2023-07-01T00:00:00Z',
    updated_at: '2023-10-31T00:00:00Z',
    user_id: '1'
  }
]

export const useProjectsWithFallback = () => {
  return useQuery({
    queryKey: ['projects-with-fallback'],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.PROJECTS)
          .select('*')
          .order('created_at', { ascending: false })
        
        if (error) throw error
        return data as Project[]
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        return mockProjects
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}

export const useFeaturedProjectsWithFallback = () => {
  return useQuery({
    queryKey: ['projects-with-fallback', 'featured'],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.PROJECTS)
          .select('*')
          .eq('featured', true)
          .order('created_at', { ascending: false })
          .limit(3)
        
        if (error) throw error
        return data as Project[]
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        return mockProjects.filter(project => project.featured).slice(0, 3)
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}