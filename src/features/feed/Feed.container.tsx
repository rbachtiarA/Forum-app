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
      {/* <div className="order-1">
        <FeedHeader option={option} setOption={setOption} />
      </div>
      <div className="order-3">
        <FeedList option={option} />
      </div> */}
      <FeedHeader option={option} setOption={setOption} />
      <PostCreateContainer />
      <FeedList option={option} />
    </>
  );
}
