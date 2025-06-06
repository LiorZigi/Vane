import { useInfiniteQuery } from '@tanstack/react-query';
import supabase from '../../initSupabase';
import type { Post } from '../models/types';

export interface PostWithLike extends Post {
  liked_by_me: boolean;
}

const PAGE_SIZE = 10;

export function usePosts() {
  return useInfiniteQuery<PostWithLike[], Error>({
    queryKey: ['posts'],
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      // 1) who is the current user?
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');
      const userId = user.id;

      // 2) load the posts page
      const from = pageParam * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);
      if (postsError) throw postsError;
      if (!posts) return [];

      // 3) fetch which of these posts this user has liked
      const postIds = posts.map(p => p.id);
      const { data: likes, error: likesError } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', userId)
        .in('post_id', postIds);
      if (likesError) throw likesError;

      const likedSet = new Set(likes.map(l => l.post_id));

      // 4) merge into your Post type
      const withLikes = posts.map(p => ({
        ...p,
        liked_by_me: likedSet.has(p.id)
      }));

      return withLikes;
    },
    getNextPageParam: (_lastPage, pages) => pages.length * PAGE_SIZE
  });
}
