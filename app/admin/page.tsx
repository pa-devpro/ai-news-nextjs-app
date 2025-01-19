'use client';
import AuthenticationForm from '@/components/authentication/AuthenticationForm';
import { Suspense } from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthenticationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
