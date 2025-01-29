'use client';

import { ConfirmationDialog } from '@/components/dashboard/ui/dialog/confirmation-dialog';
import { useDeleteUser } from '../api/delete-user';
import { useNotifications } from '@/components/dashboard/ui/notifications';
import { Button } from '@/components/dashboard/ui/button';
import { useUserProfile } from '@/features/auth/utils/auth-utils';

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const user = useUserProfile();

  const { addNotification } = useNotifications();
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        addNotification({
          type: 'success',
          title: 'User Deleted',
        });
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <ConfirmationDialog
      icon="danger"
      title="Delete User"
      body="Are you sure you want to delete this user?"
      triggerButton={<Button variant="destructive">Delete</Button>}
      confirmButton={
        <Button
          isLoading={deleteUserMutation.isPending}
          type="button"
          variant="destructive"
          onClick={() => deleteUserMutation.mutate({ userId: id })}
        >
          Delete User
        </Button>
      }
    />
  );
};
