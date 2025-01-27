import React from 'react';
import type { Metadata } from 'next';
import '../styles/main.css';
import Navbar from '@/components/navbar/Navbar';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/footer/Footer';
import { siteInfo } from '@/lib/data';
import Menu from '@/components/menu/Menu';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import PostsProviderWrapper from '@/components/PostsProviderWrapper';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import QueryClientProviderWrapper from '@/components/QueryClientProviderWrapper';

export const metadata: Metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="Body">
        <ClientErrorBoundary>
          <QueryClientProviderWrapper>
            <SessionProviderWrapper>
              <PostsProviderWrapper>
                <NextTopLoader color="#d1d5db" />
                <Navbar />
                <Menu />
                <div className="content">{children}</div>
                <Footer />
              </PostsProviderWrapper>
            </SessionProviderWrapper>
          </QueryClientProviderWrapper>
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
