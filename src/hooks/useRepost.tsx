// src/hooks/useToggleLike.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../initSupabase';

export function useRepost() {
  const qc = useQueryClient();
  return useMutation<
    void,
    Error,
    { postId: string; reposted: boolean }
  >({
    mutationFn: async ({ postId, reposted }) => {
      const {
        data: { user },
        error: authError
      } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('Not authenticated');

      if (reposted) {
        // remove repost
        const { error } = await supabase
          .from('reposts')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', postId);
        if (error) throw error;
      } else {
        // add repost
        const { error } = await supabase
          .from('reposts')
          .insert({ user_id: user.id, post_id: postId });
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['posts'] });
      qc.invalidateQueries({ queryKey: ['reposts', variables.postId] });
    },
  });
}
