import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export default function CommentButton({
  username,
  postId,
  totalComment,
}: {
  postId: number;
  totalComment: number;
  username: string;
}) {
  return (
    <Button asChild size={"sm"} variant={"secondary"}>
      <Link href={`/${username}/post/${postId}`}>
        <p>{totalComment}</p>
        <MessageSquare />
      </Link>
    </Button>
  );
}
