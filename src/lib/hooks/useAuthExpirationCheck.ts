import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        console.log('Auth event:', event);
      }

      if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });

    // Check token expiration
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.expires_at) {
        const expiresAt = new Date(session.expires_at * 1000);
        console.log('Token expires at:', expiresAt);

        // Optional: Log warning when token is close to expiring
        const timeUntilExpiry = expiresAt.getTime() - Date.now();
        if (timeUntilExpiry < 300000) {
          // 5 minutes
          console.warn('Token expires in less than 5 minutes');
        }
      }
    };

    checkSession();
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => {
      subscription.unsubscribe();
      clearInterval(interval);
    };
  }, [router]);
}
