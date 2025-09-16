"use client";
import React, { useCallback } from "react";
import { PostSchema } from "@/utils/schemas/CreatePostSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "./Post.Action";
import PostPostInput from "./Post.Input";

export default function PostCreateContainer() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: async (data: PostSchema) => {
      await createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
