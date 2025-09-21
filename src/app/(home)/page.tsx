import FeedsContainer from "@/features/feed/Feed.container";
import PostCreateContainer from "@/features/post/Post.CreateContainer";

export default async function Page() {
  return (
    <>
      <FeedsContainer />
      {/* <div className="order-2">
        <PostCreateContainer />
      </div> */}
    </>
  );
}
