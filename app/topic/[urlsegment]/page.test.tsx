import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import TopicPage from './page'; // Adjust the import path as needed
import { useRouter } from 'next/router';
import { mockPosts } from '@/news_sample/mockPosts';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/features/news-posts/context/NewsContext', () => ({
  usePosts: jest.fn(),
}));

describe('TopicPage', () => {
  it('renders the topic page with filtered posts', () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/topic/news' });
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/topic/title-1' });
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'news' });
    (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

    render(<TopicPage />);

    expect(screen.getByText('Topic: news')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('renders the topic page with no matching posts', () => {
    (useRouter as jest.Mock).mockReturnValue({ pathname: '/topic/title-1' });
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'non-existent' });
    (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

    render(<TopicPage />);

    expect(screen.getByText('Topic: non-existent')).toBeInTheDocument();
    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Title 2')).not.toBeInTheDocument();
  });
});
