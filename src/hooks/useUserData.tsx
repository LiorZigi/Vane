import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../../initSupabase'
import { VaneUser } from '@/models/types'

/** Fetch the current user's profile */
export function useUserData() {
  return useQuery<VaneUser, Error>({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) throw error
      if (!data) throw new Error('Not authenticated')
      const { data: userData, error: userDataError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()
      if (userDataError) throw userDataError
      return userData
    }
  })
}

/** Update fields on the profile */
export function useUpdateUserData() {
  const qc = useQueryClient()
  return useMutation<
    VaneUser,
    Error,
    Partial<Omit<VaneUser, 'id' | 'created_at'>>
  >({
    mutationFn: async (updates) => {
      const {
        data,
        error
      } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', (await supabase.auth.getUser())!.data.user!.id)
        .single()
      if (error) throw error
      return data
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['profiles'] })
  })
}
