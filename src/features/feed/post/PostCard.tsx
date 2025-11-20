import AvatarProfile from "@/components/AvatarProfile";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { postDateText } from "../../../utils/postDate";
import CommentButton from "../../comment/comment.button";
import VoteButton from "./vote/voteButton";
import type { Post, UserDetail } from "@/utils/type/post";

export default function PostCard({
  post,
  currentDate,
  user,
  asLink,
}: {
  post: Post<Date>;
  user: UserDetail;
  currentDate: Date;
  asLink?: boolean;
}) {
  return (
    <Card className="flex border-l-4 border-l-primary relative group/card">
      {asLink && (
        <Link
          href={`/${user.username}/post/${post.id}`}
          className="absolute group-hover/card:bg-accent/10 w-full h-full -z-0"
        />
      )}
      <div className="w-full [&_*]:z-1">
        <CardHeader className="flex flex-col py-3 space-y-2 w-fit">
          <div className="flex items-center gap-2">
            <Link
              href={`/${user.username}`}
              className="flex gap-2 items-center group/username"
              prefetch={false}
            >
              <AvatarProfile
                src={user.picture}
                alt="profile picture"
                username={user.username}
                height={24}
                width={24}
              />
              <p className="group-hover/username:underline">{user.username}</p>
            </Link>
            •
            <p
              className="text-muted-foreground"
              title={new Date(post.createdAt).toLocaleString()}
            >
              {postDateText(new Date(post.createdAt), currentDate)}
            </p>
          </div>
          <CardTitle className="font-semibold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className={"line-clamp-3 break-all z-50"}>{post.content}</p>
        </CardContent>
        <CardFooter className="flex gap-4">
          <CommentButton
            username={post.user.username}
            postId={post.id}
            totalComment={post.totalComment}
          />
          <VoteButton
            postId={post.id}
            totalVote={post.totalVote}
            voteStatus={post.isVoted}
          />
        </CardFooter>
      </div>
    </Card>
  );
}
