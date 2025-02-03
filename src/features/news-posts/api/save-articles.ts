import { ArticleToDisplay } from '../types/ArticlesToDisplay';
import { BACKEND_API_URL } from './get-articles';

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
  const url = `${BACKEND_API_URL}/articles`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!response.ok) {
    if (response.status === 500) {
      // Proceed to update the article
      const updateUrl = `${BACKEND_API_URL}/articles/${article.id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update article');
      }

      return await updateResponse.json();
    } else {
      throw new Error('Failed to save article');
    }
  }

  return await response.json();
};

export default saveArticle;
