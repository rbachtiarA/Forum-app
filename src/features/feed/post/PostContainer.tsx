"use client";

import { useQuery } from "@tanstack/react-query";
import CommentContainer from "../../comment/comment.Container";
import { usePostQueries } from "../../queries/postQueries";
import PostView from "./PostView";

export default function PostContainer({ postId }: { postId: number }) {
  const { data, isError, isLoading } = useQuery(usePostQueries(postId));
  if (isLoading) {
    return (
      <div>
        <p>Load post content...</p>
      </div>
    );
  }

  if (!data || isError) {
    return (
      <div>
        <p>Something wrong</p>
      </div>
    );
  }

  return (
    <div>
      <PostView post={data.post} />
      <CommentContainer comments={data.post.comment!} postId={postId} />
    </div>
  );
}
