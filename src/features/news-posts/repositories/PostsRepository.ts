import { toKebabCase } from '@/utils/format-text';
import logger from '@/utils/logger';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: NewsFromApi[];
};
type NewsFromApi = {
  source: { id: string | null; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

export class PostsRepository {
  private newsApiKey: string;

  constructor() {
    this.newsApiKey = process.env.NEWS_API_KEY || '';
    if (!this.newsApiKey) {
      logger.error('News API Key is required');
      throw new Error('News API Key is required');
    }
  }

  async getAllPosts(): Promise<ArticleToDisplay[]> {
    try {
      logger.info('--- Fetching News (NewsRepository) ---');

      const category = 'technology';
      const pageSize = 10;
      const newsUrl = new URL(
        `https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${this.newsApiKey}`,
      );
      logger.info(`News URL: ${newsUrl.toString()}`); // Log the constructed URL

      const dataByFetch = await fetch(newsUrl.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache',
        next: {
          revalidate: 3600, // Revalidate the cache every hour
        },
      });

      if (!dataByFetch.ok) {
        throw new Error(`Failed to fetch news: ${dataByFetch.statusText}`);
      }

      const readableData: NewsApiResponse = await dataByFetch.json();

      return readableData.articles.map(mapNewsToPost);
    } catch (error) {
      logger.error('Error fetching news:', error);
      throw new Error('Failed to fetch news');
    }
  }

  async getNewBySlug(urlsegment: string): Promise<ArticleToDisplay | null> {
    try {
      const allNews = await this.getAllPosts();
      return allNews.find((post) => post.urlsegment === urlsegment) || null;
    } catch (error) {
      logger.error('Error fetching news by slug:', error);
      throw new Error('Failed to fetch news by slug');
    }
  }
}

const mapNewsToPost = (news: NewsFromApi): ArticleToDisplay => {
  return {
    created_at: news.publishedAt,
    author: news.author,
    title: news.title,
    subtitle: news.description,
    featured_image: news.urlToImage || '/images/placeholder.jpg',
    date: news.publishedAt,
    body_raw: news.content,
    topics: ['News'],
    urlsegment: toKebabCase(news.title),
    original_url: news.url,
    generated_ai_content: null,
    questions_and_answers: [],
  };
};
