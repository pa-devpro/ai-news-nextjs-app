import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostsProvider, usePosts } from './NewsContext';

const mockPosts = [
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
    {
        _id: '2',
        author: 'Author 2',
        title: 'Title 2',
        subtitle: 'Subtitle 2',
        url: '/title-2',
        featured_image: '/image2.jpg',
        date: '2024-01-02',
        body: { raw: 'Content 2', html: 'Content 2' },
        type: 'Post',
        topics: ['News'],
        urlsegment: 'title-2',
        original_url: 'http://example.com/title-2',
        _raw: {} as any,
    },
];

const TestComponent = () => {
    const { posts } = usePosts();
    return (
        <div>
            {posts.map((post) => (
                <div key={post._id} data-testid="post">
                    {post.title}
                </div>
            ))}
        </div>
    );
};

describe('PostsContext', () => {
    it('provides posts to the component', () => {
        render(
            <PostsProvider posts={mockPosts}>
                <TestComponent />
            </PostsProvider>
        );

        const postElements = screen.getAllByTestId('post');

        expect(postElements).toHaveLength(mockPosts.length);
        expect(postElements[0]).toHaveTextContent(mockPosts[0].title);
        expect(postElements[1]).toHaveTextContent(mockPosts[1].title);


    });

    it('throws an error when usePosts is used outside of PostsProvider', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => render(<TestComponent />)).toThrow('usePosts must be used within a NewsProvider');

        consoleError.mockRestore();
    });
});