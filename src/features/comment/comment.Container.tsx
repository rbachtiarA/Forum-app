"use client";
import { Comment } from "@/utils/type/post";
import { createComment } from "./comment.action";
import { useCallback, useMemo, useState } from "react";
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
        const res = await createComment({ postId, content });
        if (!res.status) throw new Error(res.message);
        setCommentList((prev) => [...prev, res.result!]);
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
