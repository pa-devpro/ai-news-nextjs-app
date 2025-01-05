import { Post } from '../entities/Post';
import { toKebabCase } from '@/lib/utils';
import logger from "@/lib/logger";

const newsApiKey = process.env.NEWS_API_KEY;

type NewsApiResponse = {
    status: string,
    totalResults: number,
    articles: NewsFromApi[]
  };
type NewsFromApi = {
    source: { id: string | null, name: string },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  }

export class PostsRepository {
  constructor() {
    if(!newsApiKey) throw new Error('News API Key is required');
  }
  
  async getAllPosts(): Promise<Post[]> {
    logger.info('--- Fetching News (NewsRepository) ---');

    const category = 'technology';
    const pageSize = 10;
    const dataByFetch = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&apiKey=${newsApiKey}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'force-cache',
      next: {
        revalidate: 3600, // Revalidate the cache every hour
      },
    });

    const readableData: NewsApiResponse = await dataByFetch.json()

    return readableData.articles.map(mapNewsToPost)
  }

  async getNewBySlug(urlsegment: string): Promise<Post | null> {
    const allNews = await this.getAllPosts();
    return allNews.find(post => post.urlsegment === urlsegment) || null;
  }
}

const mapNewsToPost = (news: NewsFromApi): Post => {
  return {
    _id: news.source.name,
    author: news.author,
    title: news.title,
    subtitle: news.description,
    url: `/${toKebabCase(news.title)}`,
    featured_image: news.urlToImage || "/images/placeholder.jpg",
    date: news.publishedAt,
    body: {
      raw: news.content,
      html: news.content
    },
    type: 'Post',
    topics: ['News'],
    urlsegment: toKebabCase(news.title),
    original_url: news.url,
    _raw: {} as any
  };
};