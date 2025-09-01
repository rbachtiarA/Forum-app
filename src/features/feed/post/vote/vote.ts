export async function upvotePost(postId: number) {
  try {
    const data = await fetch(`/api/post/upvote?postId=${postId}`, {
      method: "POST",
    });
    const res = await data.json();

    return res;
  } catch (error) {
    throw error;
  }
}

export async function downvotePost(postId: number) {
  try {
    const data = await fetch(`/api/post/downvote?postId=${postId}`, {
      method: "POST",
    });
    const res = await data.json();

    return res;
  } catch (error) {
    throw error;
  }
}
