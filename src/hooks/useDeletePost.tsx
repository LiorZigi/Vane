import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../initSupabase';

export function useDeletePost() {
  const qc = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: async (postId) => {
      const { error } = await supabase.from('posts').delete().eq('id', postId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
