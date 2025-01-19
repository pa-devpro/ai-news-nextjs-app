'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage('Password updated successfully');
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-4xl font-bold mb-8">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="w-full max-w-md">
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your new password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
