"use client";

import FeedWrapper from "@/components/wrapper/FeedWrapper";
import { useIntersectionObserver } from "@/hooks/useInView";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { infiniteFeedsOptions } from "../queries/feedQueries";
import FeedSkeleton from "./Feed.Skeleton";
import PostCard from "./post/PostCard";

export default function FeedList({
  username,
  option,
}: {
  username?: string;
  option?: "recent" | "friend" | "popular";
}) {
  const router = useRouter();
  const currentDate = new Date();

  const {
    data,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(infiniteFeedsOptions(username, option));

  const ref = useIntersectionObserver(fetchNextPage, hasNextPage);

  if (isLoading) return <FeedSkeleton />;

  if (error) {
    router.push("/sign-in");
  }

  if (isError || !data)
    return (
      <div>
        <h1>500 : Internal Server Error</h1>
        <h2>Something is wrong, wait for our staff to fix it</h2>
      </div>
    );

  if (data?.pages.length === 0)
    return (
      <div>
        <h1>
          {username
            ? "User has not post anything yet"
            : "There is no post to show"}
        </h1>
      </div>
    );

  return (
    <>
      {data && (
        <FeedWrapper>
          {data.pages.map((page) =>
            page.posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentDate={currentDate}
                user={post.user}
                asLink
              />
            ))
          )}
          <div ref={ref} className="h-1" />
          {isFetchingNextPage && <p>loading content...</p>}
          {!hasNextPage && <p>You reach the bottom of the post</p>}
        </FeedWrapper>
      )}
    </>
  );
}
