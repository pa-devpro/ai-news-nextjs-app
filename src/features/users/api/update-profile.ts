import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';

import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { getSession } from '@/features/auth/actions/auth';

export const updateProfileInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(1, 'Required'),
  bio: z.string(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileInputSchema>;

export const updateProfile = async (
  data: UpdateProfileInput,
): Promise<unknown> => {
  const session = await getSession();
  const token = session?.access_token;
  if (!session || !token) {
    return null;
  }
  return api.patch(`/admin/profile`, { data, token });
};

type UseUpdateProfileOptions = {
  mutationConfig?: UseMutationOptions<unknown, unknown, UpdateProfileInput>;
};

export const useUpdateProfile = ({
  mutationConfig,
}: UseUpdateProfileOptions = {}) => {
  const { refetch: refetchUser } = useUserProfile();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      refetchUser();
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: updateProfile,
  });
};
