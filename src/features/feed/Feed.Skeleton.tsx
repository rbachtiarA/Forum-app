import FeedWrapper from "@/components/wrapper/FeedWrapper";
import React from "react";
import PostSkeleton from "./post/Post.Skeleton";

export default function FeedSkeleton() {
  return (
    <FeedWrapper>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </FeedWrapper>
  );
}
