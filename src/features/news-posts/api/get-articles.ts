import { api } from '@/lib/api-client';
import { useQuery } from '@tanstack/react-query';
import { SavedArticle } from '@/lib/types/supabase-types';
import { QueryConfigTypeWithArgs } from '@/lib/react-query';
import {
  ArticleToDisplay,
  QuestionAndAnswer,
} from '../types/ArticlesToDisplay';

export const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

/**
 * Fetches articles for a given user.
 *
 * @param userId - The ID of the user whose articles are to be fetched.
 * @returns A promise that resolves to an array of articles mapped to display format.
 */
const getArticles = async (userId: string) => {
  const url = `/articles?userId=${userId}`;
  const response = await api.get<SavedArticle[]>(url, {
    baseUrl: BACKEND_API_URL,
  });

  return response.map(mapSavedArticleToDisplay);
};

export const getArticlesQueryOptions = (userId?: string) => {
  return {
    queryKey: ['articles', userId],
    queryFn: () => getArticles(userId!),
  };
};

type UseArticlesOptions = {
  queryConfig?: QueryConfigTypeWithArgs<typeof getArticlesQueryOptions>;
};

export const useArticles = (
  userId: string,
  { queryConfig }: UseArticlesOptions = {},
) => {
  return useQuery({
    ...getArticlesQueryOptions(userId),
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
    topics: ['News'],
    urlsegment: saved.urlsegment || saved.title,
    original_url: saved.original_url,
    generated_ai_content: saved.generated_ai_content,
    questions_and_answers: saved.questions_and_answers as QuestionAndAnswer[],
  };
}
