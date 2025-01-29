import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';
import { Profile } from '@/lib/types/supabase-types';
import { api } from '@/lib/api-client';

const getUsers = () => {
  return api.get<Profile[]>('/admin/users');
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

type UseUsersOptions = {
  queryConfig?: QueryConfig<typeof getUsersQueryOptions>;
};

export const useUsersProfile = ({ queryConfig }: UseUsersOptions = {}) => {
  return useQuery({
    ...getUsersQueryOptions(),
    ...queryConfig,
  });
};
