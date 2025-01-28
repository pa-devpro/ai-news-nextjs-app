import { SignupFormSchema, FormState } from '../../../lib/definitions';
import { supabase } from '@/lib/supabaseClient';

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const EMAIL_REDIRECT_TO = `${BASE_URL}/auth/email-confirmed`;
const RESET_PASSWORD_REDIRECT_TO = `${BASE_URL}/auth/reset-password`;

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 5,
  delay = 1000,
): Promise<T> {
  let attempt = 0;

  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt >= retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw new Error('Max retries reached');
}

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = SignupFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
    });

    if (!validatedFields.success) {
      return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { email, password, name } = validatedFields.data;

    // Register user with Supabase
    const { data, error } = await retryWithBackoff(() =>
      supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
          emailRedirectTo: EMAIL_REDIRECT_TO,
        },
      }),
    );

    if (error) {
      return { errors: { message: error.message } };
    }

    return { user: data.user! };
  } catch (error) {
    return { errors: { message: (error as Error).message } };
  }
}

export async function signin(
  email: string,
  password: string,
): Promise<{ user: { id: string; email: string } | null; error?: string }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    return { user: { id: data.user!.id, email: data.user!.email! } };
  } catch (error) {
    return { user: null, error: (error as Error).message };
  }
}

export async function forgotPassword(
  email: string,
): Promise<{ success?: string; error?: string }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: RESET_PASSWORD_REDIRECT_TO,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: 'Password reset email sent! Please check your email.' };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
