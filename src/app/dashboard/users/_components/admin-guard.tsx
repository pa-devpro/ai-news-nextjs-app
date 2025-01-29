'use client';

import { Spinner } from '@/components/dashboard/ui/spinner';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { canViewUsers } from '@/features/auth/utils/authorization';

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const user = useUserProfile();

  if (!user?.data) {
    return <Spinner className="m-4" />;
  }

  if (!canViewUsers(user?.data)) {
    return <div>Only admin can view this.</div>;
  }

  return children;
};
