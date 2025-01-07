'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import AuthButton from './auth/AuthButton';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  console.log('🔴 ProtectedRoute', { session, status });

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <div>
        Please sign in to visualize content <AuthButton />
      </div>
    ); // Show the AuthButton if unauthenticated
  }

  if (status === 'authenticated') {
    return <>{children}</>; // Render the protected content if authenticated
  }

  return null; // Render nothing if status is unknown
};

export default ProtectedRoute;
