"use client";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommentButton({
  username,
  postId,
  totalComment,
}: {
  postId: number;
  totalComment: number;
  username: string;
}) {
  const router = useRouter();
  const ButtonStyle = {
    base: `flex gap-2 bg-accent px-2 py-1 rounded-full hover:bg-black/10`,
  };

  const handleOnClick = () => {
    router.push(`/${username}/post/${postId}`);
  };
  return (
    <button onClick={handleOnClick} className={ButtonStyle.base}>
      <p>{totalComment}</p>
      <MessageSquare />
    </button>
  );
}
