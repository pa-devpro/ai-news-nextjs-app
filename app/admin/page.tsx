'use client';
import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/login/LoginForm'), {
  ssr: false,
});

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
