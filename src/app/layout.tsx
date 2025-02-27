import React from 'react';
import type { Metadata } from 'next';
import '../styles/main.css';
import Navbar from '@/components/navbar/Navbar';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/footer/Footer';
import Menu from '@/components/menu/Menu';
import ClientErrorBoundary from '@/components/ClientErrorBoundary';
import ArticlesProviderWrapper from '@/components/ArticlesProviderWrapper';
import QueryClientProviderWrapper from '@/components/QueryClientProviderWrapper';
import { siteInfo } from '@/config/constants';
import '@/utils/polyfills'; // Import the polyfill
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
            <ArticlesProviderWrapper>
              <NextTopLoader color="#d1d5db" />
              <Navbar />
              <Menu />
              <div className="navbarSpacing">{children}</div>
              <ReactQueryDevtools initialIsOpen={false} />
              <Footer />
            </ArticlesProviderWrapper>
          </QueryClientProviderWrapper>
        </ClientErrorBoundary>
      </body>
    </html>
  );
}
