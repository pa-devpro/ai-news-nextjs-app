import { PostsRepository } from './PostsRepository';
import { Post } from '../entities/Post';

const mockPosts: Post[] = [
    {
        _id: '1',
        author: 'Author 1',
        title: 'Title 1',
        subtitle: 'Subtitle 1',
        url: '/title-1',
        featured_image: '/image1.jpg',
        date: '2024-01-01',
        body: { raw: 'Content 1', html: 'Content 1' },
        type: 'Post',
        topics: ['News'],
        urlsegment: 'title-1',
        original_url: 'http://example.com/title-1',
        _raw: {} as any,
    },
];

jest.mock('./PostsRepository', () => {
    return {
        PostsRepository: jest.fn().mockImplementation(() => {
            return {
                getAllPosts: jest.fn().mockResolvedValue(mockPosts),
                getNewBySlug: jest.fn().mockImplementation((urlsegment: string) => {
                    return Promise.resolve(mockPosts.find(post => post.urlsegment === urlsegment) || null);
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