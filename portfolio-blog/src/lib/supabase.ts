// 简化Supabase配置，使用标准的npm包导入方式
import { createClient } from '@supabase/supabase-js'

// 导出常用的表名常量
const TABLES = {
  PROFILES: 'profiles',
  PROJECTS: 'projects', 
  BLOG_POSTS: 'blog_posts',
} as const;

// 从环境变量获取Supabase配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 创建Supabase客户端
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// 导出变量
export { supabase, TABLES };

// 导出数据库操作工具函数

// 获取用户资料
export const getUserProfile = async () => {
  if (!supabase) throw new Error('Supabase客户端未初始化')
  
  const { data, error } = await supabase
    .from(TABLES.PROFILES)
    .select('*')
    .eq('id', '1') // 静态用户ID
    .single()
  
  if (error) throw error
  return data
}

// 获取所有项目
export const getAllProjects = async (filters?: {
  featured?: boolean
  status?: string
  userId?: string
  limit?: number
}) => {
  if (!supabase) throw new Error('Supabase客户端未初始化')
  
  let query = supabase
    .from(TABLES.PROJECTS)
    .select('*, profiles(username, full_name)')
    .order('created_at', { ascending: false })

  if (filters?.featured !== undefined) {
    query = query.eq('featured', filters.featured)
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  
  if (filters?.userId) {
    query = query.eq('user_id', filters.userId)
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

// 获取所有博客文章
export const getAllBlogPosts = async (filters?: {
  published?: boolean
  userId?: string
  limit?: number
  tags?: string[]
}) => {
  if (!supabase) throw new Error('Supabase客户端未初始化')
  
  let query = supabase
    .from(TABLES.BLOG_POSTS)
    .select('*, profiles(username, full_name)')
    .order('published_at', { ascending: false })

  if (filters?.published !== undefined) {
    query = query.eq('published', filters.published)
  }
  
  if (filters?.userId) {
    query = query.eq('user_id', filters.userId)
  }
  
  if (filters?.tags && filters.tags.length > 0) {
    query = query.overlaps('tags', filters.tags)
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

// 根据slug获取博客文章
export const getBlogPostBySlug = async (slug: string) => {
  if (!supabase) throw new Error('Supabase客户端未初始化')
  
  const { data, error } = await supabase
    .from(TABLES.BLOG_POSTS)
    .select('*, profiles(username, full_name, avatar_url)')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (error) throw error
  return data
}

// 增加文章浏览量
export const incrementViewCount = async (postId: string) => {
  if (!supabase) throw new Error('Supabase客户端未初始化')
  
  // 首先获取当前浏览量
  const { data: currentData, error: fetchError } = await supabase
    .from(TABLES.BLOG_POSTS)
    .select('view_count')
    .eq('id', postId)
    .single()
  
  if (fetchError) throw fetchError
  
  // 更新浏览量
  const { data, error } = await supabase
    .from(TABLES.BLOG_POSTS)
    .update({ view_count: (currentData?.view_count || 0) + 1 })
    .eq('id', postId)
    .select()
    .single()
  
  if (error) throw error
  return data
}