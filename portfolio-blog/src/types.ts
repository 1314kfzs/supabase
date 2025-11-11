// 用户资料类型定义
export interface Profile {
  id: string
  username: string
  full_name: string
  email: string
  avatar_url?: string
  bio?: string
  skills?: string[]
  created_at: string
  updated_at: string
}

// 项目类型定义
export interface Project {
  id: string
  user_id: string
  title: string
  description: string
  detailed_description?: string
  category: string
  cover_image?: string
  images?: string[]
  technologies: string[]
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold'
  start_date?: string
  end_date?: string
  github_url?: string
  demo_url?: string
  project_url?: string
  featured: boolean
  created_at: string
  updated_at: string
}

// 博客文章类型定义
export interface BlogPost {
  id: string
  user_id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url?: string
  published: boolean
  view_count: number
  tags: string[]
  published_at: string
  created_at: string
  updated_at: string
}