import { useInfiniteQuery } from '@tanstack/react-query'
import supabase from '../../initSupabase'
import type { Post } from '../models/types'

export interface PostWithLike extends Post {
  liked_by_me: boolean
}

const PAGE_SIZE = 10

export function useUserPosts(userId: string) {
  return useInfiniteQuery<PostWithLike[], Error>({
    queryKey: ['userPosts', userId],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getUserPosts({ userId, pageParam: pageParam as number })
    },
    getNextPageParam: (_lastPage, pages) => pages.length * PAGE_SIZE,
    enabled: !!userId,
  })
}


async function getUserPosts({ userId, pageParam }: { userId: string, pageParam: number }) {
  // 1) get the current user (to compute liked_by_me)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError) throw userError
  if (!user) throw new Error('Not authenticated')
  const currentUserId = user.id

  // 2) load one page of this user’s posts
  const from = pageParam as number * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const { data: posts, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId)                 // ← filter by author!
    .order('created_at', { ascending: false })
    .range(from, to)
  if (postsError) throw postsError
  if (!posts) return []

  // 3) find which of these this viewer has liked
  const postIds = posts.map((p) => p.id)
  const { data: likes, error: likesError } = await supabase
    .from('likes')
    .select('post_id')
    .eq('user_id', currentUserId)
    .in('post_id', postIds)
  if (likesError) throw likesError

  const likedSet = new Set(likes.map((l) => l.post_id))

  // 4) merge into PostWithLike
  return posts.map((p) => ({
    ...p,
    liked_by_me: likedSet.has(p.id),
  }))
}