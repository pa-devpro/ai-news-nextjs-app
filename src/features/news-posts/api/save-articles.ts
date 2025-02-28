import { getSession } from '@/features/auth/actions/auth';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';
import { BACKEND_API_URL } from './get-articles';
import { api } from '@/lib/api-client';

/**
 * Saves an article to the backend.
 * If the article already exists (status 500), it updates the existing article.
 *
 * @param {ArticleToDisplay} article - The article to be saved or updated.
 * @returns {Promise<ArticleToDisplay>} - A promise that resolves to the saved or updated article.
 * @throws {Error} - Throws an error if the article cannot be saved or updated.
 */
const saveArticle = async (
  article: Omit<ArticleToDisplay, 'created_at'>,
): Promise<{ success: boolean; message: string }> => {
  const session = await getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error('User is not authenticated. Unable to save article.');
  }

  const url = `/articles`;
  return await api.post(url, article, {
    baseUrl: BACKEND_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export default saveArticle;
