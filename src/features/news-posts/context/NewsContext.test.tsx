import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostsProvider, usePosts } from './NewsContext';
import { mockPosts } from '@/features/news-posts/fixtures/mockPosts';

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
      </PostsProvider>,
    );

    const postElements = screen.getAllByTestId('post');

    expect(postElements).toHaveLength(mockPosts.length);
    expect(postElements[0]).toHaveTextContent(mockPosts[0].title);
    expect(postElements[1]).toHaveTextContent(mockPosts[1].title);
  });

  it('throws an error when usePosts is used outside of PostsProvider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'usePosts must be used within a NewsProvider',
    );

    consoleError.mockRestore();
  });
});
