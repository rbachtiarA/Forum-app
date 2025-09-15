import type { FeedGetResponse } from "@/utils/type/post";
import { queryOptions } from "@tanstack/react-query";

export const feedAPIOptions = (username?: string) =>
  queryOptions({
    queryKey: ["posts", username],
    queryFn: async ({ queryKey }) => {
      const [, username] = queryKey;
      const queryParams = `?u=${username}`;
      const res = await fetch(`/api/feed${username ? queryParams : ""}`, {
        method: "GET",
      });
      const data: FeedGetResponse = await res.json();
      return data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
