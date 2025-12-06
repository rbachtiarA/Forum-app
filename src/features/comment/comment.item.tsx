"use client";
import AvatarProfile from "@/components/AvatarProfile";
import { postDateText } from "@/utils/postDate";
import { Comment } from "@/utils/type/post";
import ReplyCotainer from "./comment.reply.input";
import React, { Activity, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
function UserInformation({
  comment,
  currentDate,
  hide = false,
  onHide,
}: {
  comment: Comment<Date>;
  currentDate: Date;
  hide?: boolean;
  onHide?: () => void;
}) {
  const time = postDateText(new Date(comment.createdAt), currentDate);
  return (
    <span className="flex gap-4 items-center text-sm">
      {hide ? (
        <button
          title="show replies button"
          className="p-0.5 bg-background rounded-full size-10"
          onClick={onHide}
        >
          <PlusCircleIcon
            size={16}
            className="fill-background hover:cursor-pointer mx-auto"
          />
        </button>
      ) : (
        <AvatarProfile
          username={comment.user.username}
          src={comment.user.picture ?? ""}
          width={12}
          height={12}
          alt={`profile picture of ${comment.user.username}`}
        />
      )}
      <div>
        <Button asChild variant="link" className="px-0">
          <Link prefetch={false} href={`/${comment.user.username}`}>
            {comment.user.name}
          </Link>
        </Button>
        <span title={`${comment.createdAt}`}> • {time}</span>
      </div>
    </span>
  );
}

function Content({ content }: { content: Comment<Date>["content"] }) {
  return (
    <div className="contents">
      <div></div>
      <div className="ml-4">
        <p>{content}</p>
      </div>
    </div>
  );
}

function InteractionButtons({
  commentId,
  isParent = false,
  onClick,
}: {
  commentId: number;
  isParent?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="contents">
      <div className="flex justify-center self-end z-1 ml-0.5">
        {isParent && (
          <button
            title="hide replies button"
            className="p-0.5 bg-background rounded-full"
            onClick={onClick}
          >
            <MinusCircleIcon
              size={16}
              className="fill-background hover:cursor-pointer"
            />
          </button>
        )}
      </div>
      <ReplyCotainer commentId={commentId} className="ml-4" />
    </div>
  );
}

function RepliesContainer({
  replies,
  currentDate,
}: {
  replies: Comment<Date>[];
  currentDate: Date;
}) {
  return (
    <div className={`contents peer-hover:[&>.branchline>*]:border-black`}>
      {replies.map((reply, idx) => {
        const isLast = idx === replies.length - 1;
        return (
          <React.Fragment key={reply.id}>
            <div className="branchline relative pointer-events-none">
              <div className="absolute size-5 left-5 border-branch-line border-b-2 border-l-2 rounded-bl-lg pointer-events-auto"></div>
              {isLast && (
                <div className="w-full h-full bg-background pointer-events-none"></div>
              )}
            </div>

            <CommentItem
              comment={reply}
              currentDate={currentDate}
              key={reply.id}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function CommentItem({
  comment,
  currentDate,
}: {
  comment: Comment<Date>;
  currentDate: Date;
}) {
  const [replies, setReplies] = useState(comment.other_Comment || []);
  const [hide, setHide] = useState(false);
  const onClickHide = () => {
    setHide(!hide);
  };

  const onOptimistic = (newReply: Comment<Date>) => {
    setReplies((prev) => [...prev, newReply]);
  };
  return (
    <div>
      <UserInformation
        comment={comment}
        currentDate={currentDate}
        hide={hide}
        onHide={onClickHide}
      />

      <Activity mode={hide ? "hidden" : "visible"}>
        <div className="grid grid-cols-[40px_1fr] relative group/main">
          {replies.length > 0 && (
            <div
              className="absolute h-full w-5 ml-5 pt-1 peer/mainline group cursor-pointer peer"
              onClick={onClickHide}
            >
              {replies.length > 0 && (
                <div className="w-0.5 border-l-2 border-branch-line h-full peer-hover/mainline:border-foreground group-hover:border-foreground" />
              )}
            </div>
          )}

          <Content content={comment.content} />
          <InteractionButtons
            commentId={comment.id}
            onClick={onClickHide}
            isParent={replies.length > 0}
          />

          {replies.length > 0 && (
            <RepliesContainer currentDate={currentDate} replies={replies} />
          )}
        </div>
      </Activity>
    </div>
  );
}
