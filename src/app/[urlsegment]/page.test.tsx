/* eslint-disable react/display-name */
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { usePosts } from '../../features/news-posts/context/NewsContext';
import PostPage from './page';
import { mockArticles } from '../../features/news-posts/fixtures/mockArticles';
import { useSession } from 'next-auth/react';
import { useArticles } from '@/features/news-posts/api/get-articles';

jest.mock('lucide-react', () => ({
  ChevronDown: () => <div>Mocked ChevronDown Icon</div>,
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn().mockReturnValue({ get: jest.fn() }),
}));
jest.mock('../../features/news-posts/context/NewsContext', () => ({
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
jest.mock('@/features/news-posts/api/get-articles', () => ({
  useArticles: jest.fn(),
}));
describe('PostPage', () => {
  beforeAll(() => {
    process.env.SUPABASE_URL = 'your-supabase-url';
    process.env.SUPABASE_ANON_KEY = 'your-supabase-anon-key';
  });
  it('renders the post page with Full content', async () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'title-1' });
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles });
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: 'authenticated',
    });
    (useArticles as jest.Mock).mockReturnValue({
      data: mockArticles,
      isLoading: false,
    });
    await act(async () => {
      render(<PostPage />);
    });

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Mocked MarkdownWrapper')).toBeInTheDocument();
    expect(screen.getByText('Mocked ChatBox')).toBeInTheDocument();
  });

  it(' render the post page with Ai content Loading', () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'title-1' });
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles });
    (useSession as jest.Mock).mockReturnValue({ data: {}, status: 'loading' });
    (useArticles as jest.Mock).mockReturnValue({
      data: mockArticles,
      isLoading: false,
    });

    render(<PostPage />);
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('renders the "Page not found" message if the post is not found', () => {
    (useParams as jest.Mock).mockReturnValue({ urlsegment: 'non-existent' });
    (usePosts as jest.Mock).mockReturnValue({ articles: mockArticles });

    render(<PostPage />);

    expect(screen.getByText('Article not found')).toBeInTheDocument();
  });
});
