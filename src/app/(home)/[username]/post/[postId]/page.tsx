import CommentContainer from "@/features/comment/comment.Container";
import PostView from "@/features/feed/post/PostView";
import { getPostById } from "@/lib/db/post";
import { createServerSideClient } from "@/lib/supabase/server";

export default async function page(
  props: PageProps<"/[username]/post/[postId]">
) {
  const supabase = await createServerSideClient();
  const { postId } = await props.params;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!Number(postId) || !user?.id) {
    return (
      <div>
        <h1 className="text-6xl">Invalid post</h1>
      </div>
    );
  }

  const post = await getPostById({ postId: Number(postId), userId: user!.id });

  if (!post)
    return (
      <div>
        <h1 className="text-6xl">Post Not Found</h1>
      </div>
    );

  return (
    <div>
      <PostView post={post} />
      <CommentContainer comments={post.comment!} postId={post.id} />
    </div>
  );
}
