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

      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      const data: FeedGetResponse = await res.json();
      return data;
    },
    retry: (failCounts, err) => {
      if (err.message === "Unauthorized") {
        return false;
      }

      return failCounts > 3;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
