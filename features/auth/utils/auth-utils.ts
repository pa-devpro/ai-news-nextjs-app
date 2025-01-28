import { signOut } from 'next-auth/react';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { Profile } from '@/lib/types/supabase-types';
import logger from '../../../utils/logger';

export const logout = async () => {
  try {
    await signOut({ callbackUrl: '/' });
  } catch (error) {
    logger.error('Error logging out:', error);
  }
};

const getUserProfile = async () => {
  const response = await fetch('/api/admin/profile', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  console.log('User Profile Response:', response);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data: Profile = await response.json();
  if (!data) {
    throw new Error('No user profile found');
  }
  return data;
};

const userQueryKey = ['user-profile'];

export const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: [...userQueryKey],
    queryFn: getUserProfile,
  });
};

export const useUserProfile = () => useQuery(getUserQueryOptions());
