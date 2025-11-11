// 用户类型定义
export interface User {
  id: string
  email: string
  username?: string
  full_name?: string
  avatar_url?: string
  bio?: string
  skills?: string[]
  created_at: string
  updated_at: string
}

// 项目类型定义
export interface Project {
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

// 博客文章类型定义
export interface BlogPost {
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

// 认证表单类型
export interface AuthFormData {
  email: string
  password: string
  username?: string
  full_name?: string
}

// API响应类型
export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

// 分页参数
export interface PaginationParams {
  page: number
  limit: number
}

// 筛选参数
export interface FilterParams {
  search?: string
  technologies?: string[]
  featured?: boolean
  published?: boolean
  tags?: string[]
}

// 分页响应
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}