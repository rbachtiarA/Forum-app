"use server";

import { getCommentById, postComment, postReply } from "@/lib/db/comment";
import { createServerSideClient } from "@/lib/supabase/server";
import { Comment } from "@/utils/type/post";

export async function postCommentOld({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  try {
    const data = await fetch(`/api/post/${postId}/comment}`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const res = await data.json();

    return res;
  } catch (error) {
    throw error;
  }
}

export async function createReply({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  try {
    const supabase = await createServerSideClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || error) {
      throw new Error("Couldnt connect to supabase");
    }

    const parent = await getCommentById(commentId);
    if (!parent) {
      throw new Error("Invalid comment");
    }

    const reply = await postReply({
      commentId,
      content,
      userId: user!.id,
      postId: parent.postId,
    });

    return {
      status: true,
      message: "success create reply",
      result: reply,
    };
  } catch (error) {
    return {
      status: false,
      message: "failed create reply",
      result: null,
    };
  }
}

export async function createComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  try {
    const supabase = await createServerSideClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!user || error) {
      throw new Error("Couldnt connect to supabase");
    }

    if (!Number(postId)) {
      throw new Error("Invalid post");
    }

    const comment = await postComment({
      content,
      postId: Number(postId),
      userId: user.id,
    });

    return {
      status: true,
      message: "success create comment",
      result: comment as Comment<Date>,
    };
  } catch {
    return {
      status: false,
      message: "failed create comment",
      result: null,
    };
  }
}
