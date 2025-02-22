import { User } from '@supabase/supabase-js';
import { z } from 'zod';

export const SignupFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  name: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long' }),
});

export interface FormState {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    message?: string;
  } | null;
  message?: string;
  user?: User;
}
