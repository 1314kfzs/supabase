import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'
import { Profile } from '../types'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      if (!supabase) throw new Error('Supabase客户端未初始化')
      
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select('*')
        .eq('id', '1') // 静态用户ID
        .single()
      
      if (error) throw error
      return data as Profile
    }
  })
}