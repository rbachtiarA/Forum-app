"use client";
import { useState } from "react";
import FeedHeader from "./Feed.header";
import FeedList from "./Feed.list";
import PostCreateContainer from "../post/Post.CreateContainer";

export default function FeedsContainer() {
  const [option, setOption] = useState<"recent" | "popular" | "friend">(
    "recent"
  );

  return (
    <>
      <FeedHeader option={option} setOption={setOption} />
      <PostCreateContainer />
      <FeedList option={option} />
    </>
  );
}
