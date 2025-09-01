import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeedPost, FeedUserDetail } from "@/utils/type/feed";
import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { postDateText } from "../../utils/postDate";
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
        <div className="flex gap-2">
          <Link
            href={`/${user.username}`}
            className="flex gap-2 items-center group"
            prefetch={false}
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.picture ?? ""} alt="profile picture" />
              <AvatarFallback className="text-xs">
                {user.username}
              </AvatarFallback>
            </Avatar>
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
        <div className="flex gap-1 bg-accent px-2 py-1 rounded-full">
          <p>{post.totalComment}</p>
          <MessageSquare />
        </div>
      </CardFooter>
    </Card>
  );
}
