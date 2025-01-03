"use client";
import React from 'react';
import styles from "./PostPreview.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Post } from "@/domain/posts/entities/Post";

function PostPreview(post: Post) {
  const router = useRouter();

  return (
    <div
      style={{ textDecoration: "inherit", color: "inherit" }}
      onClick={(event) => {
        event.stopPropagation();
        router.push(post.url);
      }} 
      className={styles.PostPreviewContainer}
    >
      <div className={styles.ImageWrapper}>
        <Image
          className={styles.Image}
          src={post.featured_image || "/images/placeholder.jpg"}
          alt=""
          fill
          sizes="100%"
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={styles.ArticleTextInfo}>
        <div className={styles.Topics}>
          {post.topics.map((topic) => (
            <div
              onClick={(event) => {
                event.stopPropagation();
                router.push(`topic/${topic}`);
              }}
              style={{ textDecoration: "inherit" }}
              className={styles.Topic}
              key={topic}
            >
              {topic}
            </div>
          ))}
        </div>
        <div className={styles.Title}>{post.title}</div>
        <time className={styles.Date} dateTime={post.date}>
          {format(parseISO(post.date), "LLLL d, yyyy")}
        </time>
      </div>
    </div>
  );
}

export default PostPreview;
