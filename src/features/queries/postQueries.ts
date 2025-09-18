import { PostGetResponse } from "@/utils/type/post";
import { queryOptions } from "@tanstack/react-query";

export const usePostQueries = (postId: number) =>
  queryOptions({
    queryKey: ["post", postId],
    queryFn: async ({ queryKey }) => {
      const [, postId] = queryKey;
      const res = await fetch(`/api/post/${postId}`, {
        method: "GET",
      });
      if (res.status === 401) {
        throw new Error("Unauthorized");
      }
      const data: PostGetResponse = await res.json();
      return data;
    },
    retry: (failCounts, err) => {
      if (err.message === "Unauthorized") {
        return false;
      }

      return failCounts > 2;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
