/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { usePosts } from '../../context/NewsContext';
import PostPage from './page'; // Ensure this path is correct and PostPage is a valid React component
import { mockPosts } from '@/news_sample/mockPosts';
import { useSession } from 'next-auth/react';
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));
jest.mock('../../context/NewsContext', () => ({
  usePosts: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));
jest.mock('@/components/markdown-wrapper/MarkdownWrapper', () => () => (
  <div>Mocked MarkdownWrapper</div>
));
jest.mock('./NewsAiContent', () => () => <div>Mocked NewsAiContent</div>);
jest.mock('@/components/chat-box/ChatBox', () => () => (
  <div>Mocked ChatBox</div>
));

describe('PostPage', () => {
  it('renders the post page with Full content', async () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'title-1' });
    (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: 'authenticated',
    });

    await act(async () => {
      render(<PostPage />);
    });

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1 /')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('Mocked MarkdownWrapper')).toBeInTheDocument();
    expect(screen.getByText('Mocked NewsAiContent')).toBeInTheDocument();
    expect(screen.getByText('Mocked ChatBox')).toBeInTheDocument();
  });

  it(' render the post page with Ai content Loading', () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'title-1' });
    (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });
    (useSession as jest.Mock).mockReturnValue({ data: {}, status: 'loading' });

    render(<PostPage />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Subtitle 1')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Author 1 /')).toBeInTheDocument();
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('Mocked MarkdownWrapper')).toBeInTheDocument();

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the "Page not found" message if the post is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'non-existent' });
    (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

    render(<PostPage />);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
