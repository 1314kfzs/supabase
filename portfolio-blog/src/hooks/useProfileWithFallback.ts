import { useQuery } from '@tanstack/react-query'
import { supabase, TABLES } from '../lib/supabase'

// Define the User type locally since it's not properly exported
interface User {
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

// Mock data for fallback
const mockProfile: User = {
  id: '1',
  email: 'user@example.com',
  username: '施贻鹏',
  full_name: '施贻鹏',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  bio: '全栈开发者，专注于React、Node.js和云计算技术。热爱开源，喜欢分享技术经验。',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'Docker', 'AWS'],
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z'
}

export const useProfileWithFallback = () => {
  return useQuery({
    queryKey: ['profile-with-fallback'],
    queryFn: async () => {
      try {
        // First try to fetch from Supabase
        if (!supabase) throw new Error('Supabase客户端未初始化')
        
        const { data, error } = await supabase
          .from(TABLES.PROFILES)
          .select('*')
          .eq('id', '1') // 静态用户ID
          .single()
        
        if (error) throw error
        return data as User
      } catch (error) {
        // If Supabase fetch fails, fallback to mock data
        console.warn('Failed to fetch from Supabase, using mock data:', error)
        return mockProfile
      }
    },
    retry: 1 // Only retry once to avoid long loading times
  })
}