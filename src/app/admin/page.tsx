'use client';
import { BASE_URL } from '@/features/auth/actions/auth';
import AuthenticationForm from '@/features/auth/components/AuthenticationForm';
import { Suspense } from 'react';

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1>Base URL: {BASE_URL} --- check url</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthenticationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default LoginPage;
