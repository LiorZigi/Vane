import supabase from '../../initSupabase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';

/** 1. Sign up & create a blank profile row */
export function useSignUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;

      // insert the new profile
      const { error: profileError } = await supabase
        .from('Users')
        .insert({
          id: data.user?.id,
          bio: '',
          avatarUrl: null,
        });
      if (profileError) throw profileError;
    },
    onSuccess: () => {
      // optionally refetch current user/session
      qc.invalidateQueries({ queryKey: ['session'] });
      qc.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

/** 2. Sign in */
export function useSignIn() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      email,
      password
    }: {
      email: string;
      password: string
    }) => {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['session', 'profile'] }),
  });
}

/** 3. Sign out */
export function useSignOut() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => qc.clear(),
  });
}

export function useSession() {
  // 1. state holds the real session object
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // 2. fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    // 3. subscribe to future changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // cleanup
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return session
}

