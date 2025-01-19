import { SignupFormSchema, FormState } from '../lib/definitions';
import { supabase } from '@/lib/supabaseClient';

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
          emailRedirectTo: 'http://localhost:3000/email-confirmed', // Set the redirect URL here
        },
      }),
    );

    console.log('SUPABASE Data:', { data });
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
