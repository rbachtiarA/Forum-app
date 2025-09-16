import PostContainer from "@/features/feed/PostContainer";
import PostCreateContainer from "@/features/post/Post.CreateContainer";
// import dynamic from "next/dynamic";

// const PostsFeed = dynamic(() => import("@/features/feed/PostContainer"), {
//   loading: () => <p>Loading</p>,
// });

// const PostCreateContainer = dynamic(
//   () => import("@/features/post/Post.CreateContainer")
// );

export default async function Page() {
  return (
    <>
      <PostCreateContainer />

      <PostContainer />
    </>
  );
}
