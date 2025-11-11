import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'
import { BlogPost } from '../types'

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
      
      if (error) throw error
      return data as BlogPost[]
    }
  })
}

export const useLatestBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts', 'latest'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(3)
      
      if (error) throw error
      return data as BlogPost[]
    }
  })
}

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.BLOG_POSTS)
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single()
      
      if (error) throw error
      return data as BlogPost
    }
  })
}