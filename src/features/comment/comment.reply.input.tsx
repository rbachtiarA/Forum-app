"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EllipsisIcon, ReplyIcon, Share2Icon } from "lucide-react";
import { Activity, useState } from "react";
import { createReply } from "./comment.action";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export default function ReplyCotainer({
  commentId,
  className,
  onOptimistic,
}: {
  commentId: number;
  className?: string;
  onOptimistic?: () => void;
}) {
  const [showInput, setShowInput] = useState(false);

  const handleRepliesButton = () => {
    setShowInput(!showInput);
  };

  const handleCancel = () => {
    setShowInput(false);
  };
  return (
    <div className={cn(className, "flex flex-col w-full items-center")}>
      <div className="flex w-full items-center">
        <Button variant={"ghost"} size={"sm"} onClick={handleRepliesButton}>
          <ReplyIcon />
          Replies
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          <Share2Icon />
          Share
        </Button>
        <Button variant={"ghost"} size={"sm"}>
          <EllipsisIcon />
        </Button>
      </div>

      <Activity mode={showInput ? "visible" : "hidden"}>
        <ReplyInput commentId={commentId} onCancel={handleCancel} />
      </Activity>
    </div>
  );
}

function ReplyInput({
  onCancel,
  commentId,
}: {
  commentId: number;
  onCancel?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = async () => {
    if (value.trim().length === 0 || isLoading) return;
    try {
      setIsLoading(true);
      const reply = await createReply({
        commentId,
        content: value,
      });

      if (reply.status) {
        setValue("");
      } else {
        throw "Something wrong";
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setValue("");
    onCancel && onCancel();
  };
  return (
    <div className="space-y-2 p-1 w-full">
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <div className="space-x-2">
        <Button size={"sm"} variant={"secondary"} onClick={handleCancel}>
          Cancel
        </Button>
        <Button size={"sm"} variant={"default"} onClick={handleSubmit}>
          Reply
        </Button>
      </div>
    </div>
  );
}
