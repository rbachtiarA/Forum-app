"use client";

import { Button } from "@/components/ui/button";
import { EllipsisIcon, ReplyIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

export default function ReplyInput() {
  const [showInput, setShowInput] = useState(false);

  const handleRepliesButton = () => {
    setShowInput(!showInput);
  };

  return (
    <>
      <div className="flex w-full">
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

      {/* <Activity mode={showInput ? "visible" : "hidden"}>
        <div className="space-y-2">
          <Textarea />
          <div className="space-x-2">
            <Button size={"sm"} variant={"secondary"}>
              Cancel
            </Button>
            <Button size={"sm"} variant={"default"}>
              Reply
            </Button>
          </div>
        </div>
      </Activity> */}
    </>
  );
}
