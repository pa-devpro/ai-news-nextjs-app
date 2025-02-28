'use client';

import React from 'react';
import AuthButton from '../features/auth/components/AuthButton';
import logger from '@/utils/logger';
import '@/utils/polyfills'; // Import the polyfill
import { useSession } from '@/lib/hooks/useSession';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const status = session ? 'authenticated' : 'unauthenticated';
  logger.info('🔴 ProtectedRoute', { session, status });

  if (status === 'unauthenticated') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15vh',
          textAlign: 'center',
        }}
      >
        <p>Please sign in to visualize content</p>
        <AuthButton />
      </div>
    ); // Show the AuthButton if unauthenticated
  }

  if (status === 'authenticated') {
    return <>{children}</>; // Render the protected content if authenticated
  }

  return null; // Render nothing if status is unknown
};

export default ProtectedRoute;
