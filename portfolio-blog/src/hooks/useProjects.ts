import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'
import { Project } from '../types'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as Project[]
    }
  })
}

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ['projects', 'featured'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.PROJECTS)
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3)
      
      if (error) throw error
      return data as Project[]
    }
  })
}