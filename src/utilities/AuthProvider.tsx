'use client';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { ReactNode, createContext, useEffect, useState } from 'react';

export const AuthContext = createContext<Session | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION') {
        setSession(session);
      } else if (event === 'SIGNED_IN') {
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setSession(null);
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
