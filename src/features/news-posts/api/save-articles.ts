import { getSession } from 'next-auth/react';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';
import { BACKEND_API_URL } from './get-articles';
import { api } from '@/lib/api-client';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

/**
 * Saves an article to the backend.
 * If the article already exists (status 500), it updates the existing article.
 *
 * @param {ArticleToDisplay} article - The article to be saved or updated.
 * @returns {Promise<ArticleToDisplay>} - A promise that resolves to the saved or updated article.
 * @throws {Error} - Throws an error if the article cannot be saved or updated.
 */
const saveArticle = async (
  article: ArticleToDisplay,
): Promise<ArticleToDisplay> => {
  const session = await getSession();
  const token = session?.accessToken;

  const url = `/articles`;
  const response = await api.post(url, article, {
    baseUrl: BACKEND_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response as Promise<ArticleToDisplay>;
};

type UseDeleteSavedArticleOptions = {
  mutationConfig?: UseMutationOptions<unknown, unknown, ArticleToDisplay>;
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
    mutationFn: saveArticle,
  });
};

export default saveArticle;
