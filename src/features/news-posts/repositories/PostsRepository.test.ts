import { PostsRepository } from './PostsRepository';
import { mockArticles } from '@/features/news-posts/fixtures/mockArticles';

jest.mock('./PostsRepository', () => {
  return {
    PostsRepository: jest.fn().mockImplementation(() => {
      return {
        getAllPosts: jest.fn().mockResolvedValue(mockArticles),
        getNewBySlug: jest.fn().mockImplementation((urlsegment: string) => {
          return Promise.resolve(
            mockArticles.find((post) => post.urlsegment === urlsegment) || null,
          );
        }),
      };
    }),
  };
});

describe('PostsRepository', () => {
  let postsRepository: PostsRepository;

  beforeEach(() => {
    postsRepository = new PostsRepository();
  });

  it('should fetch all posts', async () => {
    const posts = await postsRepository.getAllPosts();
    expect(posts).toEqual(mockArticles);
  });

  it('should fetch a post by urlsegment', async () => {
    const post = await postsRepository.getNewBySlug('title-1');
    expect(post).toEqual(mockArticles[0]);
  });

  it('should return null for a non-existent urlsegment', async () => {
    const post = await postsRepository.getNewBySlug('non-existent-urlsegment');
    expect(post).toBeNull();
  });
});
