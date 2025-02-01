import React from 'react';
import { render, screen } from '@testing-library/react';
import { PostsProvider, usePosts } from './NewsContext';
import { mockArticles } from '../fixtures/mockArticles';

const TestComponent = () => {
  const { articles } = usePosts();
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id} data-testid="article-test">
          {article.title}
        </div>
      ))}
    </div>
  );
};

describe('PostsContext', () => {
  it('provides posts to the component', () => {
    render(
      <PostsProvider articles={mockArticles}>
        <TestComponent />
      </PostsProvider>,
    );

    const postElements = screen.getAllByTestId('article-test');

    expect(postElements).toHaveLength(mockArticles.length);
    expect(postElements[0]).toHaveTextContent(mockArticles[0].title);
    expect(postElements[1]).toHaveTextContent(mockArticles[1].title);
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
