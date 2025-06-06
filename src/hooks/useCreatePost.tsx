// src/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '../../initSupabase';
import type { Post } from '../models/types';
import { uploadMediaFile } from '../utils/media';

export function useCreatePost() {
  const qc = useQueryClient();

  return useMutation<Post, Error, { content: string; mediaFiles?: Blob[] }>({
    mutationFn: async ({ content, mediaFiles }) => {
      // 1) get user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
      if (!user) throw new Error('Not authenticated');

      // 2) handle media upload
      let media_urls: string[] = [];
      if (mediaFiles?.length) {
        media_urls = await Promise.all(
          mediaFiles.map((file) => uploadMediaFile(file, user.id))
        );
      }

      // 3) insert
      const { data, error } = await supabase
        .from('posts')
        .insert({
          author_id: user.id,
          content,
          media_urls,
        })
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // invalidate the first page of posts
      qc.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
