import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../initSupabase';
import { VaneUser } from '../models/types';

type SetupProfileInput = {
  username: string;
  display_name: string;
  avatar_url?: string;
};

export function useSetupProfile() {
  const qc = useQueryClient();
  return useMutation<VaneUser, Error, SetupProfileInput>({
    mutationFn: async ({ username, display_name, avatar_url }: SetupProfileInput) => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error('No authenticated user found');
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userData.user.id,
          username,
          display_name,
          bio: '',
          avatar_url: avatar_url ?? null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
