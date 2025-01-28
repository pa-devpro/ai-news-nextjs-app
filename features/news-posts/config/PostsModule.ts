import { PostsRepository } from '../repositories/PostsRepository';
import { PostsService } from '../services/PostsService';

export class PostsModule {
  static create() {
    const postsRepository = new PostsRepository();
    const postsService = new PostsService(postsRepository);
    return postsService;
  }
}
