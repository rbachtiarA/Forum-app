import type { FeedGetResponse } from "@/utils/type/post";
import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

export const feedAPIOptions = (
  username?: string,
  option?: "recent" | "popular" | "friend"
) =>
  queryOptions({
    queryKey: ["posts", option, username],
    queryFn: async ({ queryKey }) => {
      const [, option, username] = queryKey;
      const queryParams = [
        username ? `u=${username}` : "",
        option ? `opt=${option}` : "",
      ]
        .filter(Boolean)
        .join("&");
      const res = await fetch(
        `/api/feed${queryParams ? `?${queryParams}` : ""}`,
        {
          method: "GET",
        }
      );

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      const data: { result: FeedGetResponse } = await res.json();
      return data.result;
    },
    retry: (failCounts, err) => {
      if (err.message === "Unauthorized") {
        return false;
      }

      return failCounts < 3;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });

export const infiniteFeedsOptions = (
  username?: string,
  option?: "recent" | "popular" | "friend"
) =>
  infiniteQueryOptions({
    queryKey: ["posts", option as string, username],
    queryFn: async ({ queryKey, pageParam }) => {
      const [, option, username] = queryKey;
      const queryParams = [
        username ? `u=${username}` : "",
        option ? `opt=${option}` : "",
      ]
        .filter(Boolean)
        .join("&");
      const res = await fetch(
        `/api/feed?c=${pageParam}${queryParams ? `&${queryParams}` : ""}`,
        {
          method: "GET",
        }
      );

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      const data: { result: FeedGetResponse } = await res.json();
      return data.result;
    },
    initialPageParam: `${Date.now()}`,
    getNextPageParam: (lastpage) => lastpage.cursor,
    retry: (failCounts, err) => {
      if (err.message === "Unauthorized") {
        return false;
      }

      return failCounts < 3;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
