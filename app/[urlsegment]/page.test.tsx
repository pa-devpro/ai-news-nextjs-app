import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { usePosts } from '../../context/NewsContext';
import PostPage from './page';

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
}));

jest.mock('../../context/NewsContext', () => ({
    usePosts: jest.fn(),
}));

jest.mock('@/components/markdown-wrapper/MarkdownWrapper', () => () => <div>Mocked MarkdownWrapper</div>);
jest.mock('./NewsAiContent', () => () => <div>Mocked NewsAiContent</div>);

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

describe('PostPage', () => {
    it('renders the post page with post content', async () => {
        (useParams as jest.Mock).mockReturnValue({ urlsegment: 'title-1' });
        (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

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
    });

    it('renders the "Page not found" message if the post is not found', () => {
        (useParams as jest.Mock).mockReturnValue({ urlsegment: 'non-existent' });
        (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

        render(<PostPage />);

        expect(screen.getByText('Page not found')).toBeInTheDocument();
    });
});