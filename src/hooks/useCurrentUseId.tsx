// src/hooks/useCurrentUserId.ts
import { useState, useEffect } from 'react'
import supabase from '../../initSupabase'

export function useCurrentUserId() {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (!error && user) setUserId(user.id)
    })

  }, [])

  return userId
}
