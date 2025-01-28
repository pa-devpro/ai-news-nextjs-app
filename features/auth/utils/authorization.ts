import { User } from '@/lib/types/supabase-types';

export const canViewUsers = (user: User | null | undefined) => {
  return user?.role === 'ADMIN';
};
