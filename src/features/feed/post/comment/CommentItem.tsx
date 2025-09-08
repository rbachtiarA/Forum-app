import AvatarProfile from "@/components/AvatarProfile";
import { postDateText } from "@/utils/postDate";
import { Comment } from "@/utils/type/post";

export default function CommentItem({
  comment,
  currentDate,
}: {
  comment: Comment<string>;
  currentDate: Date;
}) {
  return (
    <div className="flex space-x-4">
      <div className="w-6 flex justify-center hover:[&_div]:border-muted-foreground hover:cursor-pointer">
        <div className="border-l-2 border-muted"></div>
      </div>
      <div>
        {/* header (picture, username, date post) */}
        <div>
          <span className="flex gap-4 items-center">
            <AvatarProfile
              username={comment.user.username}
              src={comment.user.picture ?? ""}
              width={24}
              height={24}
              alt={`profile picture of ${comment.user.username}`}
            />
            <p>{comment.user.name}</p>•
            <p>{postDateText(new Date(comment.createdAt), currentDate)}</p>
          </span>
        </div>

        {/* body (content) */}
        <div>
          <p>{comment.content}</p>
        </div>

        {/* footer */}
        <div className="flex w-full">
          <div className="w-full bg-gray h-4"></div>
        </div>
      </div>
    </div>
  );
}
