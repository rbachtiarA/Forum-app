import { Comment } from "@/utils/type/post";
import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
}: {
  comments: Comment<string>[];
}) {
  const currDate = new Date();
  return (
    <div>
      {/* HEADER */}
      <div></div>

      {/* COMMENT SECTION */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentDate={currDate}
          />
        ))}
      </div>
    </div>
  );
}
