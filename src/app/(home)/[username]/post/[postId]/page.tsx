import PostContainer from "@/features/feed/post/PostContainer";

export default async function page(
  props: PageProps<"/[username]/post/[postId]">
) {
  const { postId } = await props.params;

  if (!Number(postId))
    return (
      <div>
        <h1 className="text-6xl">Invalid post</h1>
      </div>
    );

  return (
    <div>
      <PostContainer postId={Number(postId)} />
    </div>
  );
}
