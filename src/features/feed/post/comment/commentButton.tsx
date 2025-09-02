"use client";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CommentButton({
  postId,
  totalComment,
}: {
  postId: number;
  totalComment: number;
}) {
  const ButtonStyle = {
    base: `flex gap-2 bg-accent px-2 py-1 rounded-full hover:bg-black/10`,
  };

  const router = useRouter();
  const handleRedirect = () => router.push(`/post/${postId}`);
  return (
    <button onClick={handleRedirect} className={ButtonStyle.base}>
      <p>{totalComment}</p>
      <MessageSquare />
    </button>
  );
}
