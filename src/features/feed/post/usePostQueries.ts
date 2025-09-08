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
      const data: PostGetResponse = await res.json();
      return data;
    },
    staleTime: 30000,
    refetchOnWindowFocus: false,
  });
