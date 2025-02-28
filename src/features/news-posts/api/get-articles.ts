import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { SavedArticle } from '@/lib/types/supabase-types';
import { QueryConfigTypeWithArgs } from '@/lib/react-query';
import {
  ArticleToDisplay,
  QuestionAndAnswer,
} from '../types/ArticlesToDisplay';
import { getSession } from '@/features/auth/actions/auth';
import { env } from '@/config/env';

export const BACKEND_API_URL = env.BACKEND_API_URL;
/**
 * Fetches articles for a given user.
 *
 * @Token userId - The ID of the user whose articles are to be fetched.
 * @returns A promise that resolves to an array of articles mapped to display format.
 */
const getArticles = async () => {
  const session = await getSession();
  const token = session?.access_token;

  if (!token) {
    throw new Error('No authentication token found');
  }

  const url = `/articles`;
  const response = await api.get<SavedArticle[]>(url, {
    baseUrl: BACKEND_API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return response.map(mapSavedArticleToDisplay);
};

export const getArticlesQueryOptions = () => {
  return {
    queryKey: ['articles'],
    queryFn: () => getArticles(),
  };
};

type UseArticlesOptions = {
  queryConfig?: QueryConfigTypeWithArgs<typeof getArticlesQueryOptions>;
};

export const useArticles = ({ queryConfig }: UseArticlesOptions = {}) => {
  return useQuery({
    ...getArticlesQueryOptions(),
    ...queryConfig,
  });
};

function mapSavedArticleToDisplay(saved: SavedArticle): ArticleToDisplay {
  return {
    id: saved.id,
    user_id: saved.user_id,
    created_at: saved.created_at || '',
    title: saved.title,
    subtitle: saved.subtitle,
    featured_image: saved.featured_image,
    author: saved.author,
    date: saved.date,
    body_raw: saved.body_raw,
    topics: saved.topics || ['General'],
    urlsegment: saved.urlsegment || saved.title,
    original_url: saved.original_url,
    generated_ai_content: saved.generated_ai_content,
    questions_and_answers: saved.questions_and_answers as QuestionAndAnswer[],
  };
}
