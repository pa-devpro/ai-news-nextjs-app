'use client'
import styles from "./Topic.module.css";
import PostPreview from "@/components/post-preview/PostPreview";
import { Suspense, Usable, use } from "react";
import { usePosts } from "@/context/NewsContext";
import { useParams } from "next/navigation";

export default function Topic() {
  
  const topicName = useParams().urlsegment as String;
  const {posts} = usePosts();
  
  const filteredPosts = posts
    .filter((post) => {
      const topicsInLowerCase = post.topics.toString().toLowerCase();
      return topicsInLowerCase.includes(topicName.toLowerCase());
    });

  return (
    <div className={styles.Topic}>
      <h1>Topic: {topicName}</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <div className="ListPosts">
          {filteredPosts.map((post, idx) => (
            <PostPreview key={idx} {...post} />
          ))}
        </div>
      </Suspense>

    </div>
  );
}
