import { queryOptions, useQuery } from '@tanstack/react-query';
import { Profile } from '@/lib/types/supabase-types';
import logger from '../../../utils/logger';
import { getSession, signOut } from '../actions/auth';

export const logout = async () => {
  try {
    await signOut();
  } catch (error) {
    logger.error('Error logging out:', error);
  }
};

const getUserProfile = async () => {
  const session = await getSession();
  const response = await fetch(
    `/api/admin/profile?email=${session?.user?.email}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token}`,
      },
    },
  );

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
