import { VaneUser } from "@/models/types";
import { useQuery } from "@tanstack/react-query";
import supabase from "../../initSupabase";

export function useFetchUser(userId: string) {
  const { data, isLoading, error } = useQuery<VaneUser, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  })

  return { data, isLoading, error }
}