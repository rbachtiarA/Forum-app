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
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      await upvotePost(postId);
      if (!isVoted || isVoted === "downvoted") {
        setIsVoted("upvoted");
      } else {
        setIsVoted(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownVote = async (postId: number) => {
    try {
      setIsLoading(true);
      await downvotePost(postId);
      if (!isVoted || isVoted === "upvoted") {
        setIsVoted("downvoted");
      } else {
        setIsVoted(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const ButtonStyle = {
    upvote: `stroke-1 ${
      isVoted === "upvoted"
        ? "fill-primary stroke-primary hover:fill-none"
        : "hover:stroke-primary"
    }`,
    downvote: `stroke-1 ${
      isVoted === "downvoted"
        ? "fill-destructive stroke-destructive hover:fill-none"
        : "group-hover/downvote:stroke-destructive"
    }`,
  };

  return (
    <div className="flex items-center gap-2 text-md rounded-md bg-secondary">
      <button
        onClick={() => handleUpvote(postId)}
        className={
          "w-full h-full hover:bg-primary/20 rounded-l-md p-1 group/upvote"
        }
        disabled={isLoading}
      >
        <ArrowBigUp className={ButtonStyle.upvote} />
      </button>
      <span>{voteValue()}</span>
      <button
        onClick={() => handleDownVote(postId)}
        className="w-full h-full hover:bg-destructive/20 rounded-r-md p-1 group/downvote"
        disabled={isLoading}
      >
        <ArrowBigDown className={`${ButtonStyle.downvote}`} />
      </button>
    </div>
  );
}
