import { User } from '@/types/supabase';

export const canViewUsers = (user: User | null | undefined) => {
  return user?.role === 'ADMIN';
};
