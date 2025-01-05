import type { Metadata } from 'next';
import '../styles/main.css';
import Navbar from '@/components/navbar/Navbar';
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/footer/Footer';
import { siteInfo } from '@/lib/data';
import Menu from '@/components/menu/Menu';
import { PostsProvider } from '@/context/NewsContext';
import { PostsModule } from '@/domain/posts/PostsModule';
import { samplePosts } from '@/news_sample/sample-posts';

export const metadata: Metadata = {
  title: siteInfo.title,
  description: siteInfo.description,
};

const postsModule = PostsModule.create();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const posts = await postsModule.getAllPosts();

  return (
    <html lang="en">
      <body className="Body">
        <PostsProvider posts={[...posts, ...samplePosts]}>
          <NextTopLoader color="#d1d5db" />
          <Navbar />
          <Menu />
          <div className="content">{children}</div>
          <Footer />
        </PostsProvider>
      </body>
    </html>
  );
}
