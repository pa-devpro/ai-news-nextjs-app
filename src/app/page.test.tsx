import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import Home from './page';
import { mockArticles } from '@/features/news-posts/fixtures/mockArticles';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/features/news-posts/context/NewsContext', () => ({
  usePosts: jest.fn(),
}));

describe('Home', () => {
  it('renders the home page with sorted posts', async () => {
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles });

    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });
});
