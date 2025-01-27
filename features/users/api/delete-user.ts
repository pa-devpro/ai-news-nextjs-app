import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query';
import { getUsersQueryOptions } from './get-users';
import { api } from '@/lib/api-client';

// Data Transfer Object for deleting a user
export type DeleteUserDTO = {
  userId: string;
};

const deleteUser = ({ userId }: DeleteUserDTO) => {
  return api.delete(`/admin/users`, { body: { userId } });
};

type UseDeleteUserOptions = {
  mutationConfig?: UseMutationOptions<unknown, unknown, DeleteUserDTO>;
};

export const useDeleteUser = ({
  mutationConfig,
}: UseDeleteUserOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteUser,
  });
};
