'use client';
import styles from './Search.module.css';
import { usePathname } from 'next/navigation';
import { compareDesc } from 'date-fns';
import ArticlePreview from '@/components/article-preview/ArticlePreview';
import { usePosts } from '@/features/news-posts/context/NewsContext';
import { ArticleToDisplay } from '@/features/news-posts/types/ArticlesToDisplay';

function Search() {
  const pathname = usePathname();
  const keyword = pathname.replace('/search/', '');
  const decodedKeyword = decodeURIComponent(keyword);

  const { articles } = usePosts();

  const searchedPosts = articles
    .filter((article) => {
      const titleInLowerCase = article.title.toString().toLowerCase();
      return titleInLowerCase.includes(decodedKeyword);
    })
    .sort((a, b) => compareDesc(new Date(a.date!), new Date(b.date!)));

  const postPreviews = searchedPosts.map(
    (article: ArticleToDisplay, idx: number) => (
      <ArticlePreview key={idx} {...article} />
    ),
  );
  return (
    <div className={styles.SearchPageContainer}>
      <h1>Search Results for &quot;{decodedKeyword}&quot;</h1>
      <div className="ListPosts">{postPreviews}</div>
    </div>
  );
}

export default Search;
