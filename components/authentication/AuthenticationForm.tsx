'use client';

import { useReducer, useState } from 'react';
import { signIn as nextAuthSignIn } from 'next-auth/react';
import Image from 'next/image';
import { formReducer, initialFormState } from '@/reducers/formReducer';
import {
  handleForgotPassword,
  handleRegistration,
  handleSignIn,
} from '@/handlers/authHandlers';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (forgotPassword) {
      const result = await handleForgotPassword(email);
      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage(result.success as string);
      }
    } else if (isRegistering) {
      handleRegistration(formData, state, dispatch, setSuccessMessage);
    } else {
      const result = await handleSignIn(email, password, nextAuthSignIn);
      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage(result.success as string);
      }
    }
  };

  const renderFormFields = () => (
    <>
      {successMessage && (
        <div className="mb-4 text-green-500 text-center">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
      )}
      {isRegistering && !forgotPassword && (
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
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            placeholder="Enter your password"
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            style={{ top: '70%', transform: 'translateY(-50%)' }}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? (
              <AiFillEyeInvisible className="h-5 w-5 text-gray-700" />
            ) : (
              <AiFillEye className="h-5 w-5 text-gray-700" />
            )}
          </div>
        </div>
      )}
    </>
  );

  const renderButtons = () => (
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
          onClick={() => {
            setForgotPassword(true);
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
        >
          Forgot Password?
        </a>
      )}
    </div>
  );

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
            setSuccessMessage(null);
            setErrorMessage(null);
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
            setSuccessMessage(null);
            setErrorMessage(null);
          }}
        >
          Register
        </a>
      </div>
      <form onSubmit={handleOnSubmit}>
        {renderFormFields()}
        {renderButtons()}
      </form>
    </div>
  );
};

export default LoginForm;
