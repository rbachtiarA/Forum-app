import dynamic from "next/dynamic";

const CreatePostLayout = dynamic(
  () => import("@/features/feed/CreatePostLayout"),
  {
    loading: () => <p>LoOading</p>,
  }
);

const PostsFeed = dynamic(() => import("@/features/feed/PostContainer"), {
  loading: () => <p>Loading</p>,
});
export default async function Page() {
  return (
    <>
      <CreatePostLayout />
      <PostsFeed />
    </>
  );
}
