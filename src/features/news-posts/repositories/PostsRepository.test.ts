import { PostsRepository } from './PostsRepository';
import { mockPosts } from '@/features/news-posts/fixtures/mockPosts';

jest.mock('./PostsRepository', () => {
  return {
    PostsRepository: jest.fn().mockImplementation(() => {
      return {
        getAllPosts: jest.fn().mockResolvedValue(mockPosts),
        getNewBySlug: jest.fn().mockImplementation((urlsegment: string) => {
          return Promise.resolve(
            mockPosts.find((post) => post.urlsegment === urlsegment) || null,
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
    expect(posts).toEqual(mockPosts);
  });

  it('should fetch a post by urlsegment', async () => {
    const post = await postsRepository.getNewBySlug('title-1');
    expect(post).toEqual(mockPosts[0]);
  });

  it('should return null for a non-existent urlsegment', async () => {
    const post = await postsRepository.getNewBySlug('non-existent-urlsegment');
    expect(post).toBeNull();
  });
});
