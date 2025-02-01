import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import Search from './page';
import { useRouter } from 'next/navigation';
import { mockArticles } from '@/features/news-posts/fixtures/mockArticles';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('@/features/news-posts/context/NewsContext', () => ({
  usePosts: jest.fn(),
}));

describe('Search', () => {
  it('renders the search results', () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/search/title-1' });
    (usePathname as jest.Mock).mockReturnValue('/search/title');
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles || [] });

    render(<Search />);

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('renders no results if no posts match the search keyword', () => {
    (usePathname as jest.Mock).mockReturnValue('/search/non-existent');
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles });

    render(<Search />);

    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Title 2')).not.toBeInTheDocument();
  });
});
