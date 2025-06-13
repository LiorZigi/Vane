import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../../initSupabase'
import { VaneUser } from '@/models/types'
import { useSession } from './useAuth'

/** Fetch the current user's profile */
export function useUserData() {
  const session = useSession()

  return useQuery<VaneUser, Error>({
    queryKey: ['profiles', session?.user?.id],
    queryFn: async () => {
      console.log('🔍 useUserData: Starting fetch...')
      console.log('🔍 useUserData: Session exists:', !!session)
      console.log('🔍 useUserData: User ID:', session?.user?.id)

      const { data, error } = await supabase.auth.getUser()
      console.log('🔍 useUserData: getUser result:', { data: !!data?.user, error })

      if (error) {
        console.error('🔍 useUserData: Auth error:', error)
        throw error
      }
      if (!data?.user) {
        console.error('🔍 useUserData: No user data')
        throw new Error('Not authenticated')
      }

      console.log('🔍 useUserData: Fetching profile for user:', data.user.id)
      const { data: userData, error: userDataError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      console.log('🔍 useUserData: Profile fetch result:', { userData: !!userData, error: userDataError })

      if (userDataError) {
        console.error('🔍 useUserData: Profile fetch error:', userDataError)
        throw userDataError
      }

      console.log('🔍 useUserData: Success! Returning user data')
      return userData
    },
    enabled: !!session?.user?.id, // Only run query if we have a session
    retry: 3,
    retryDelay: 1000,
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
