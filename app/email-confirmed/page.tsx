'use client';
import AuthButton from '@/components/login/AuthButton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const EmailConfirmed = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold">Email Confirmed</h1>
      <p className="mt-4 text-lg">
        Thank you for confirming your email address. You can now sign in.
      </p>

      {session.status === 'authenticated' ? (
        <button
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => router.push('/')}
        >
          Read News
        </button>
      ) : (
        <AuthButton />
      )}
    </div>
  );
};

export default EmailConfirmed;
