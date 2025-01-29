'use client';
import styles from './Search.module.css';
import { usePathname } from 'next/navigation';
import { compareDesc } from 'date-fns';
import PostPreview from '@/components/post-preview/PostPreview';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import { Post } from '@/features/news-posts/types/Post';

function Search() {
  const pathname = usePathname();
  const keyword = pathname.replace('/search/', '');
  const decodedKeyword = decodeURIComponent(keyword);

  const { posts } = usePosts();

  const searchedPosts = posts
    .filter((post) => {
      const titleInLowerCase = post.title.toString().toLowerCase();
      return titleInLowerCase.includes(decodedKeyword);
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const postPreviews = searchedPosts.map((post: Post, idx: number) => (
    <PostPreview key={idx} {...post} />
  ));
  return (
    <div className={styles.SearchPageContainer}>
      <h1>Search Results for &quot;{decodedKeyword}&quot;</h1>
      <div className="ListPosts">{postPreviews}</div>
    </div>
  );
}

export default Search;
