'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password?.value;
    if (forgotPassword) {
      // Handle forgot password logic here
      console.log('Forgot Password needs implementation');
      console.log('Forgot Password:', { email });
    } else if (isRegistering) {
      const name = e.currentTarget.name;
      // Handle registration logic here
      console.log(
        'Registration logic needs implementation. Please add API call or other necessary steps.',
      );
      console.log('Registering:', { name, email, password });
    } else {
      signIn('credentials', { email, password });
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-6">
        <Image
          src="/favicon.ico"
          alt="Favicon"
          className="w-12 h-12"
          width={10}
          height={10}
        />
      </div>
      <div className="flex justify-center mb-6 items-center">
        <a
          className={`px-4 py-2 cursor-pointer ${!isRegistering ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
          onClick={() => {
            setIsRegistering(false);
            setForgotPassword(false);
          }}
        >
          Sign In
        </a>
        <span className="px-2">|</span>
        <a
          className={`px-4 py-2 cursor-pointer ${isRegistering ? 'text-blue-500 font-bold' : 'text-gray-500'}`}
          onClick={() => {
            setIsRegistering(true);
            setForgotPassword(false);
          }}
        >
          Register
        </a>
      </div>
      <form onSubmit={handleOnSubmit}>
        {isRegistering && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        {!forgotPassword && (
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>
        )}
        <div className="flex items-center justify-between mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {forgotPassword
              ? 'Reset Password'
              : isRegistering
                ? 'Register'
                : 'Sign In'}
          </button>
          {!forgotPassword && (
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setForgotPassword(true)}
            >
              Forgot Password?
            </a>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;