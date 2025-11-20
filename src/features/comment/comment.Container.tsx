"use client";
import { Comment } from "@/utils/type/post";
import { postComment } from "./comment.action";
import { useCallback, useState } from "react";
import CommentInput from "./Comment.PostInput";
import CommentList from "./comment.list";

export default function CommentContainer({
  comments,
  postId,
}: {
  comments: Comment<Date>[];
  postId: number;
}) {
  const currDate = new Date();
  const [commentList, setCommentList] = useState<Comment<Date>[]>(comments);
  const handleSubmit = useCallback(
    async (content: string) => {
      try {
        const res = await postComment({ postId, content });
        setCommentList((prev) => [...prev, res.result]);
      } catch (err) {
        console.log(err);
      }
    },
    [postId]
  );
  return (
    <div>
      {/* HEADER */}
      <CommentInput handleSubmit={handleSubmit} />

      {/* COMMENT SECTION */}
      <CommentList comments={commentList} currDate={currDate} />
    </div>
  );
}
