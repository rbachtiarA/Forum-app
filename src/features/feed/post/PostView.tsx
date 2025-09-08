"use client";

import { Post } from "@/utils/type/post";
import PostCard from "../PostCard";

export default function PostView({ post }: { post: Post<string> }) {
  return (
    <div>
      <PostCard user={post.user} post={post} currentDate={new Date()} />
    </div>
  );
}
