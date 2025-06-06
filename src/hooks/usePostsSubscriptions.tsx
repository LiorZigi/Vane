// hooks/usePostSubscriptions.ts
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Post } from '@/domains/feed/models/PostModel'
import supabase from '../../initSupabase'

export function usePostSubscriptions() {
  const qc = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel('public:posts')                // name it anything
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'posts' },
        payload => {
          const updated: Post = payload.new as Post
          // update the specific post in cache
          qc.setQueryData<Post[]>(['posts'], old =>
            old?.map(p => (p.postId === updated.postId ? updated : p)) ?? []
          )
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [qc])
}
