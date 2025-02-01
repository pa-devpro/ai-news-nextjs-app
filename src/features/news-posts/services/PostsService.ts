import { PostsRepository } from '../repositories/PostsRepository';
import { ArticleToDisplay } from '../types/ArticlesToDisplay';

export class PostsService {
  constructor(private newsRepository: PostsRepository) {}

  async getAllPosts(): Promise<ArticleToDisplay[]> {
    return this.newsRepository.getAllPosts();
  }

  async getPostBySlug(urlsegment: string): Promise<ArticleToDisplay | null> {
    return this.newsRepository.getNewBySlug(urlsegment);
  }
}
