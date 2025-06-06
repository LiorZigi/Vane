// src/hooks/useComments.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../initSupabase';
import type { Comment } from '../models/types';

export function useComments(postId: string) {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data!;
    }
  });
}

export function useAddComment() {
  const qc = useQueryClient();
  return useMutation<
    Comment,
    Error,
    { postId: string; content: string }
  >({
    mutationFn: async ({ postId, content }) => {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('comments')
        .insert({ post_id: postId, user_id: user.id, content })
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['comments', variables.postId] });
      qc.invalidateQueries({ queryKey: ['posts'] });
    }
  });
}
