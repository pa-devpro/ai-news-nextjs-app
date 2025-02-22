import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';

export function useSession(): Session | null {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get the current session when the component mounts
    supabase.auth.getSession().then(({ data, error }) => {
      if (!error) {
        setSession(data.session);
      }
    });

    // Subscribe to auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    // Cleanup the subscription on unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return session;
}
