import { signup, signin, forgotPassword } from '@/features/auth/actions/auth';
import { FormState } from '@/features/auth/types/definitions';
import logger from '@/utils/logger';
import {
  RegisteringSuccess,
  RegisteringError,
} from '@/features/auth/reducers/authFormReducer';
import { SignInResponse } from 'next-auth/react';

export const handleForgotPassword = async (email: string) => {
  const result = await forgotPassword(email);
  if (result.error) {
    logger.error('Forgot Password error:', result.error);
    return { error: result.error };
  }
  return { success: result.success };
};

export const handleRegistration = async (
  formData: FormData,
  state: FormState,
  dispatch: React.Dispatch<RegisteringSuccess | RegisteringError>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const result = await signup(state, formData);
    if (result.user) {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: result.user as RegisteringSuccess['payload'],
      });
      setSuccessMessage(
        'User registered successfully! Please check your email to confirm your account.',
      );
    } else if (result.errors) {
      dispatch({ type: 'REGISTER_ERROR', payload: result.errors });
    }
  } catch (error) {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: error as RegisteringError['payload'],
    });
  }
};

export const handleSignIn = async (
  email: string,
  password: string,
  nextAuthSignIn: (
    provider: string,
    options: Record<string, string>,
  ) => Promise<SignInResponse | undefined>,
) => {
  const result = await signin(email, password);
  if (result.error) {
    logger.error('Sign in error:', result.error);
    return { error: result.error };
  }
  await nextAuthSignIn('credentials', { email, password });
  return { success: 'Signed in successfully' };
};
