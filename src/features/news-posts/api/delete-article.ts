import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseMutationOptions } from '@tanstack/react-query';
import { BACKEND_API_URL } from './get-articles';
import { api } from '@/lib/api-client';

/**
 * Data Transfer Object (DTO) for deleting a saved article.
 *
 * @property {number} articleId - The unique identifier of the article to be deleted.
 */
export type DeleteSavedArticleDTO = {
  articleId: number;
};

const deleteSavedArticle = async ({ articleId }: DeleteSavedArticleDTO) => {
  const url = `/articles/${articleId}`;

  return api.delete(url, {
    baseUrl: BACKEND_API_URL,
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
