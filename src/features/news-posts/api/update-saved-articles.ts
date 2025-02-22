import { getSession } from '@/features/auth/actions/auth';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';
import { BACKEND_API_URL } from './get-articles';
import { api } from '@/lib/api-client';

/**
 * Updates an article to the backend.
 *
 * @param {ArticleToDisplay} article - The article to be updated.
 * @returns {Promise<ArticleToDisplay>} - A promise that resolves to the saved or updated article.
 * @throws {Error} - Throws an error if the article cannot be saved or updated.
 */
const updateSavedArticle = async (
  article: Omit<ArticleToDisplay, 'created_at'>,
): Promise<string> => {
  const session = await getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error('User is not authenticated. Unable to update article.');
  }

  // Proceed to update the article
  const dataToUpdateFromArticle = {
    questions_and_answers: article.questions_and_answers,
  };
  const updateUrl = `/articles/${article.id}`;
  const updateResponse = await api.put<{ success: boolean; message: string }>(
    updateUrl,
    dataToUpdateFromArticle,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      baseUrl: BACKEND_API_URL,
    },
  );

  return updateResponse.message;
};

export default updateSavedArticle;
