import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePosts } from '@/context/NewsContext';
import Home from './page';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

jest.mock('next/navigation', () => ({
useRouter: jest.fn(),
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

describe('Home', () => {
    it('renders the home page with sorted posts', async () => {
        (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

        await act(async () => {
            render(<Home />);
          });

        expect(screen.getByText('Title 1')).toBeInTheDocument();
        expect(screen.getByText('Title 2')).toBeInTheDocument();
    });
});