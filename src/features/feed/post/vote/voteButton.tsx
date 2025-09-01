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

  return (
    <div className="flex gap-2 bg-accent px-2 py-1 rounded-full">
      <button onClick={() => handleUpvote(postId)}>
        <ArrowBigUp
          className={`${
            isVoted === "upvoted" ? "fill-green-400 stroke-green-400" : ""
          }`}
        />
      </button>
      <p>{voteValue()}</p>
      <button onClick={() => handleDownVote(postId)}>
        <ArrowBigDown
          className={`${
            isVoted === "downvoted" ? "fill-red-500 stroke-red-500" : ""
          }`}
        />
      </button>
    </div>
  );
}
