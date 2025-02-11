'use client';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { Table } from '@/components/dashboard/ui/table';
import { formatDate } from '@/utils/format';
import { DeleteUser } from './delete-user';
import { useUsersProfile } from '../api/get-users';
import styles from './users-list.module.css';

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
    <div className={styles['table-container']}>
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
            className: styles['hide-on-mobile'],
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Role',
            field: 'role',
            className: styles['hide-on-mobile'],
          },
          {
            title: 'Created At',
            field: 'created_at',
            className: styles['hide-on-mobile'],

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
    </div>
  );
};
