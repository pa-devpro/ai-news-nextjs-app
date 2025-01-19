import { signup, signin } from '@/actions/auth';
import { FormState } from '@/lib/definitions';
import { RegisteringSuccess, RegisteringError } from '@/reducers/formReducer';
import { SignInResponse } from 'next-auth/react';

export const handleForgotPassword = (email: string) => {
  console.log('Forgot Password needs implementation');
  console.log('Forgot Password:', { email });
};

export const handleRegistration = async (
  formData: FormData,
  state: FormState,
  dispatch: React.Dispatch<RegisteringSuccess | RegisteringError>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  console.log('Registering:', formData.get('email'));
  try {
    const result = await signup(state, formData);
    if (result.user) {
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: result.user as RegisteringSuccess['payload'],
      });
      console.log('User registered successfully:', result.user);
      setSuccessMessage(
        'User registered successfully! Please check your email to confirm your account.',
      );
    } else if (result.errors) {
      dispatch({ type: 'REGISTER_ERROR', payload: result.errors });
      console.error('Registration error:', result.errors);
    }
  } catch (error) {
    dispatch({
      type: 'REGISTER_ERROR',
      payload: error as RegisteringError['payload'],
    });
    console.error('Registration error:', error);
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
    console.error('Sign in error:', result.error);
  }
  console.log('Sign In:', { email, password });
  await nextAuthSignIn('credentials', { email, password });
};
