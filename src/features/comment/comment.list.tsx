import { Comment } from "@/utils/type/post";
import CommentItem from "./comment.item";
import CommentInput from "./comment.header";
import { postComment } from "./comment.action";

export default function CommentList({
  comments,
  postId,
}: {
  comments: Comment<string>[];
  postId: number;
}) {
  const currDate = new Date();

  const handleSubmit = async (content: string) => {
    try {
      const res = await postComment({ postId, content });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* HEADER */}
      <CommentInput handleSubmit={handleSubmit} />

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
