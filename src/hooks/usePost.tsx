import { useQuery } from "@tanstack/react-query";
import supabase from "../../initSupabase";
import { Post } from "@/models/types";

export function usePost(postId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      // 1) get current user
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('Not authenticated');
      const userId = user.id;

      // 2) fetch the post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()
      if (postError) throw postError
      if (!post) throw new Error('Post not found')

      // 3) check if current user has liked this post
      const { data: likes, error: likesError } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', userId)
        .eq('post_id', postId);
      if (likesError) throw likesError;

      // 4) merge the like information
      const postWithLike = {
        ...post,
        liked_by_me: likes.length > 0
      };

      return postWithLike;
    },
    enabled: !!postId,
  })

  return { data: data as Post, isLoading, error }
}