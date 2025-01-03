import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'next/navigation';
import { usePosts } from '@/context/NewsContext';
import TopicPage from './page'; // Adjust the import path as needed
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('next/navigation', () => ({
    useParams: jest.fn(),
    useRouter: jest.fn()
}));

jest.mock('@/context/NewsContext', () => ({
    usePosts: jest.fn(),
}));

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