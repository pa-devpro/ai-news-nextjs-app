import { signup, signin, forgotPassword } from '@/features/auth/actions/auth';
import logger from '@/utils/logger';
import {
  RegisteringSuccess,
  RegisteringError,
} from '@/features/auth/reducers/authFormReducer';

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
  dispatch: React.Dispatch<RegisteringSuccess | RegisteringError>,
  setSuccessMessage: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const result = await signup(formData);
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

export const handleSignIn = async (email: string, password: string) => {
  const result = await signin(email, password);
  if (result.error) {
    logger.error('Sign in error:', result.error);
    return { error: result.error };
  }
  return { success: 'Signed in successfully' };
};
