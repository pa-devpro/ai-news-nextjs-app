'use client';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { Table } from '@/components/dashboard/ui/table';
import { formatDate } from '@/utils/format';
import { DeleteUser } from './delete-user';
import { useUsersProfile } from '../api/get-users';

export const UsersList = () => {
  const { data: users, isLoading } = useUsersProfile();

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!users) return null;

  return (
    <>
      <Table
        data={users}
        columns={[
          {
            title: 'ID',
            field: 'id',
            Cell({ entry: { id } }) {
              return (
                <span>
                  {id.slice(0, 2)}**{id.slice(-2)}
                </span>
              );
            },
          },
          {
            title: 'Name',
            field: 'name',
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Role',
            field: 'role',
          },
          {
            title: 'Created At',
            field: 'created_at',
            Cell({ entry: { created_at } }) {
              return <span>{formatDate(created_at!)}</span>;
            },
          },
          {
            title: '',
            field: 'id',
            Cell({ entry: { id } }) {
              return <DeleteUser id={id} />;
            },
          },
        ]}
      />
    </>
  );
};
