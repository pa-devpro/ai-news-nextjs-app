'use client';

import { Spinner } from '@/components/dashboard/ui/spinner';
import { useUserProfile } from '@/features/auth/utils/auth-utils';

export const DashboardInfo = () => {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) return <Spinner />;
  if (!user) return null;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h1 className="text-xl">
        Welcome <b>{`${user.name}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user.role}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user.role === 'USER' && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {user.role === 'ADMIN' && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </div>
  );
};
