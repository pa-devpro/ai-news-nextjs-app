import React from 'react';
import { LoginForm } from '@/components/login/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
}
