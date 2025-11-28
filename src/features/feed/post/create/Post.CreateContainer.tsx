"use client";
import React, { useCallback } from "react";
import { PostSchema } from "@/utils/schemas/CreatePostSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PostPostInput from "./Post.Input";
import { createPostAction } from "./Post.Action";

export default function PostCreateContainer() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: PostSchema) => {
      await createPostAction({ content: data.content, title: data.title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "recent"] });
    },
    onError: () => {
      console.log("Error Creating Posts");
    },
  });

  const handleSubmit = useCallback(
    (value: string) => {
      mutateAsync({ content: value, title: "This is Placeholder" });
    },
    [mutateAsync]
  );

  return <PostPostInput handleSubmit={handleSubmit} />;
}
