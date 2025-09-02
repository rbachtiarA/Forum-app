"use client";
import { FeedPost } from "@/utils/type/feed";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { downvotePost, upvotePost } from "./vote";
import { useState } from "react";

export default function VoteButton({
  postId,
  voteStatus,
  totalVote,
}: {
  postId: number;
  voteStatus: FeedPost["isVoted"];
  totalVote: number;
}) {
  const [isVoted, setIsVoted] = useState<FeedPost["isVoted"]>(voteStatus);
  const voteValue = () => {
    let base = totalVote;
    if (isVoted === voteStatus) {
      return base;
    }

    if (voteStatus === "downvoted" && isVoted === "upvoted") {
      base += 1;
    }

    if (voteStatus === "upvoted" && isVoted === "downvoted") {
      base -= 1;
    }

    if (
      (voteStatus !== "upvoted" && isVoted === "upvoted") ||
      (voteStatus === "downvoted" && isVoted !== "downvoted")
    ) {
      base += 1;
    }

    if (
      (voteStatus === "upvoted" && isVoted !== "upvoted") ||
      (voteStatus !== "downvoted" && isVoted === "downvoted")
    ) {
      base -= 1;
    }

    return base;
  };

  const handleUpvote = async (postId: number) => {
    try {
      await upvotePost(postId);
      if (!isVoted || isVoted === "downvoted") {
        setIsVoted("upvoted");
      } else {
        setIsVoted(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownVote = async (postId: number) => {
    try {
      await downvotePost(postId);
      if (!isVoted || isVoted === "upvoted") {
        setIsVoted("downvoted");
      } else {
        setIsVoted(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const ButtonStyle = {
    base: `hover:bg-black/10 rounded-full`,
    upvote: `${
      isVoted === "upvoted"
        ? "fill-green-400 stroke-green-400 hover:fill-none"
        : "hover:stroke-green-700"
    }`,
    downvote: `${
      isVoted === "downvoted"
        ? "fill-red-500 stroke-red-500 hover:fill-none"
        : "hover:stroke-red-500"
    }`,
  };

  return (
    <div className="flex gap-2 bg-accent px-2 py-1 rounded-full">
      <button onClick={() => handleUpvote(postId)} className={ButtonStyle.base}>
        <ArrowBigUp className={ButtonStyle.upvote} />
      </button>
      <p>{voteValue()}</p>
      <button
        onClick={() => handleDownVote(postId)}
        className={ButtonStyle.base}
      >
        <ArrowBigDown className={ButtonStyle.downvote} />
      </button>
    </div>
  );
}
