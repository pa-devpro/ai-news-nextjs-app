'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import AuthButton from '../features/auth/components/AuthButton';
import logger from '@/utils/logger';
import '@/utils/polyfills'; // Import the polyfill

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  logger.info('🔴 ProtectedRoute', { session, status });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

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
