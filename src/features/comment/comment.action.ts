export async function postComment({
  postId,
  content,
}: {
  postId: number;
  content: string;
}) {
  try {
    const data = await fetch(`/api/post/${postId}/comment`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const res = await data.json();

    return res;
  } catch (error) {
    throw error;
  }
}

export async function postReplies({
  commentId,
  content,
}: {
  commentId: number;
  content: string;
}) {
  try {
    const data = await fetch(`/api/comment/${commentId}/reply`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const res = await data.json();
    return res;
  } catch (error) {
    throw error;
  }
}
