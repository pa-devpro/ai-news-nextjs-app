import { PostsRepository } from '../repositories/PostsRepository';
import { Post } from '../../../features/news-posts/types/Post';

export class PostsService {
  constructor(private newsRepository: PostsRepository) {}

  async getAllPosts(): Promise<Post[]> {
    return this.newsRepository.getAllPosts();
  }

  async getPostBySlug(urlsegment: string): Promise<Post | null> {
    return this.newsRepository.getNewBySlug(urlsegment);
  }
}
