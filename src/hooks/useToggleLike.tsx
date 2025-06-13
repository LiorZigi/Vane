// src/hooks/useToggleLike.ts
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../../initSupabase'
import type { Post } from '@/models/types'

type PostsContext = {
  previousFeed?: InfiniteData<Post[]>
  previousPost?: Post
}

export function useToggleLike() {
  const qc = useQueryClient()

  return useMutation<void, Error, { postId: string; isLiked: boolean }, PostsContext>({
    mutationFn: async ({ postId, isLiked }) => {
      console.log('🔘 [useToggleLike] mutationFn called', { postId, isLiked })

      const { data: authRes, error: authError } = await supabase.auth.getUser()
      if (authError) throw authError
      if (!authRes.user) throw new Error('Not authenticated')
      const userId = authRes.user.id

      if (isLiked) {
        console.log('→ deleting like', { userId, postId })
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', userId)
          .eq('post_id', postId)
        if (error) throw error
        console.log('✅ delete succeeded')
      } else {
        console.log('→ inserting like', { userId, postId })
        const { error } = await supabase
          .from('likes')
          .insert({ user_id: userId, post_id: postId })
        if (error) throw error
        console.log('✅ insert succeeded')
      }
    },

    onMutate: async ({ postId, isLiked }) => {
      console.log('🔄 [useToggleLike] onMutate', { postId, isLiked })
      // 1) cancel any outgoing refetches
      await qc.cancelQueries({ queryKey: ['posts'] })
      await qc.cancelQueries({ queryKey: ['post', postId] })

      // 2) snapshot both caches
      const previousFeed = qc.getQueryData<InfiniteData<Post[]>>(['posts'])
      const previousPost = qc.getQueryData<Post>(['post', postId])

      // 3) update FEED cache (infinite pages)
      if (previousFeed) {
        qc.setQueryData<InfiniteData<Post[]>>(['posts'], old => ({
          ...old!,
          pages: old!.pages.map(page =>
            page.map(p =>
              p.id === postId
                ? {
                  ...p,
                  likes_count: p.likes_count + (isLiked ? -1 : +1),
                  liked_by_me: !isLiked
                }
                : p
            )
          )
        }))
      }

      // 4) update SINGLE POST cache
      if (previousPost) {
        qc.setQueryData<Post>(['post', postId], old => ({
          ...old!,
          likes_count: old!.likes_count + (isLiked ? -1 : +1),
          liked_by_me: !isLiked,
        }))
      }
      return { previousFeed, previousPost }
    },

    onError: (error, vars, context) => {
      console.error('🔴 [useToggleLike] onError', error, vars, context)
      if (context?.previousFeed) {
        qc.setQueryData(['posts'], context.previousFeed)
      }
      if (context?.previousPost) {
        qc.setQueryData(['post', vars.postId], context.previousPost)
      }
    },

    onSettled: (_data, _error, { postId }) => {
      console.log('🔁 [useToggleLike] onSettled → invalidating posts')
      qc.invalidateQueries({ queryKey: ['posts'] })
      qc.invalidateQueries({ queryKey: ['post', postId] })
    },
  })
}
