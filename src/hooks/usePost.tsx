import { useQuery } from "@tanstack/react-query";
import supabase from "../../initSupabase";
import { Post } from "@/models/types";

export function usePost(postId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single()
      if (error) throw error
      return data
    },
    enabled: !!postId,
  })

  return { data: data as Post, isLoading, error }
}