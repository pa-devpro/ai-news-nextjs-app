'use client'
import Image from "next/image";
import styles from "./Article.module.css";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { Suspense} from "react";
import dynamic from "next/dynamic";
import { usePosts } from "@/context/NewsContext";
import { useParams } from "next/navigation";
import MarkdownWrapper from "@/components/markdown-wrapper/MarkdownWrapper";
import logger from "@/lib/logger";

const NewsAiContent = dynamic(() => import('./NewsAiContent'));

function PostPage() {
  logger.info("--- PostPage ---")

  const { posts } = usePosts();
  const {urlsegment} = useParams();

  const post = posts.find((post) => post.urlsegment === urlsegment);

  if (!post) {
    return (
      <div className={styles.ErrorMessage}>
        <h1>Page not found</h1>
        <p>
          Let&apos;s go to the <Link href="/">homepage</Link> instead.
        </p>
      </div>
    );
  }

  
  const topicLinks = post.topics.map((category: string) => (
    <Link
      href={`topic/${category}`}
      key={category}
      className={styles.ArticleTopic}
      style={{ textDecoration: "inherit" }}
    >
      {category}
    </Link>
  ));

  return (
    <div className={styles.Article}>
      <div className={styles.ArticleTopics}>
          {topicLinks}
      </div>
      <h1 className={styles.ArticleTitle}>{post.title}</h1>
      <div className={styles.ArticleSubtitle}>{post.subtitle}</div>
        <Image
          src={post.featured_image || "/images/placeholder.jpg"}
          alt={post.title}
          width={400}
          height={280}
          priority
        />
      <div className={styles.Byline}>
        {post.author} /{" "}
        <time dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </div>

      <div className={styles.ArticleBody}>
        <MarkdownWrapper>{post.body.raw}</MarkdownWrapper>
      </div>

      <br />
        <Suspense fallback={<div>Loading...</div>}>
          <NewsAiContent post={post} />
        </Suspense>
      
    </div>
  );
}

export default PostPage;
