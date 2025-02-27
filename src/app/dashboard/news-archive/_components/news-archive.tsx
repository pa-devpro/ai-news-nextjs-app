'use client';
import { Link } from '@/components/dashboard/ui/link';
import { Spinner } from '@/components/dashboard/ui/spinner';
import { Table } from '@/components/dashboard/ui/table';
import { useUserProfile } from '@/features/auth/utils/auth-utils';
import { useArticles } from '@/features/news-posts/api/get-articles';
import { DeleteSavedArticle } from '@/features/news-posts/components/delete-saved-articles';
import { formatDate } from '@/utils/format';
import React from 'react';
import styles from './Archive.module.css';

const NewsArchive: React.FC = () => {
  const { data: profile, isLoading } = useUserProfile();
  if (isLoading) return <Spinner size="lg" />;

  if (!profile) return null;
  return (
    <div>
      <h1>News Archive</h1>
      <p>Welcome to the news archive page.</p>
      <ArticlesSavedList />
    </div>
  );
};

const ArticlesSavedList: React.FC = () => {
  const { data: articles, isLoading } = useArticles();
  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!articles) return null;
  return (
    <div className={styles['table-container']}>
      <Table
        data={articles}
        columns={[
          {
            title: 'ID',
            field: 'id',
            className: styles['hide-on-mobile'],
          },
          {
            title: 'Title',
            field: 'title',
          },
          {
            title: 'Topics',
            field: 'topics',
            className: styles['hide-on-mobile'],
          },
          {
            title: 'Link',
            field: 'urlsegment',
            Cell({ entry: { urlsegment } }) {
              const modifiedUrl = `/${urlsegment}`;
              return (
                <Link href={modifiedUrl} target="_blank">
                  Link
                </Link>
              );
            },
          },
          {
            title: 'Saved Date',
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
              return <DeleteSavedArticle id={id!} />;
            },
          },
        ]}
      />
    </div>
  );
};

export default NewsArchive;
