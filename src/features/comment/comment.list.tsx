import { Comment } from "@/utils/type/post";
import CommentItem from "./comment.item";

export default function CommentList({
  comments,
  currDate,
}: {
  comments: Comment<string>[];
  currDate: Date;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentDate={currDate}
        />
      ))}
    </div>
  );
}
