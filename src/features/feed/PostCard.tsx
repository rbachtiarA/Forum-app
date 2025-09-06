import AvatarProfile from "@/components/AvatarProfile";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeedPost, FeedUserDetail } from "@/utils/type/feed";
import Link from "next/link";
import { postDateText } from "../../utils/postDate";
import CommentButton from "./post/comment/commentButton";
import VoteButton from "./post/vote/voteButton";

export default function PostCard({
  post,
  currentDate,
  user,
}: {
  post: FeedPost;
  user: FeedUserDetail;
  currentDate: Date;
}) {
  return (
    <Card className="">
      <CardHeader className="flex flex-col py-3 space-y-2">
        <div className="flex items-center gap-2">
          <Link
            href={`/${user.username}`}
            className="flex gap-2 items-center group"
            prefetch={false}
          >
            <AvatarProfile
              src={user.picture ?? ""}
              alt="profile picture"
              username={user.username}
              height={24}
              width={24}
            />
            <p className="group-hover:underline">{user.username}</p>
          </Link>
          •
          <p className="text-muted-foreground">
            {postDateText(new Date(post.createdAt), currentDate)}
          </p>
        </div>
        <CardTitle className="font-semibold">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-4">
        <VoteButton
          postId={post.id}
          totalVote={post.totalVote}
          voteStatus={post.isVoted}
        />
        <CommentButton
          username={post.user.username}
          postId={post.id}
          totalComment={post.totalComment}
        />
      </CardFooter>
    </Card>
  );
}
