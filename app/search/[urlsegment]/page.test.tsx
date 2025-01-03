import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { usePosts } from '@/context/NewsContext';
import Search from './page';
import { useRouter } from 'next/navigation';


jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    usePathname: jest.fn(),
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

describe('Search', () => {
    it('renders the search results', () => {
        (useRouter as jest.Mock).mockReturnValue({ pathname: '/search/title-1' });
        (usePathname as jest.Mock).mockReturnValue('/search/title');
        (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });
    
        render(<Search />);
    
        expect(screen.getByText('Title 1')).toBeInTheDocument();
        expect(screen.getByText('Title 2')).toBeInTheDocument();
      });

    it('renders no results if no posts match the search keyword', () => {
        (usePathname as jest.Mock).mockReturnValue('/search/non-existent');
        (usePosts as jest.Mock).mockReturnValue({ posts: mockPosts });

        render(<Search />);

        expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Title 2')).not.toBeInTheDocument();
    });
});