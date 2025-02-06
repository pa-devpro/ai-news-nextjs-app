import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query';
import { BACKEND_API_URL } from './get-articles';
import { api } from '@/lib/api-client';
import { getSession } from 'next-auth/react';

/**
 * Data Transfer Object (DTO) for deleting a saved article.
 *
 * @property {number} articleId - The unique identifier of the article to be deleted.
 */
export type DeleteSavedArticleDTO = {
  articleId: number;
};

const deleteSavedArticle = async ({ articleId }: DeleteSavedArticleDTO) => {
  const session = await getSession();
  const token = session?.accessToken;

  if (!token) {
    throw new Error('No authentication token found');
  }
  const url = `/articles/${articleId}`;

  return api.delete(url, {
    baseUrl: BACKEND_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

type UseDeleteSavedArticleOptions = {
  mutationConfig?: UseMutationOptions<unknown, unknown, DeleteSavedArticleDTO>;
};

export const useDeleteSavedArticle = ({
  mutationConfig,
}: UseDeleteSavedArticleOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteSavedArticle,
  });
};
