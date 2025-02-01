import CreatePostLayout from "@/features/forumPost/CreatePostLayout";
import PostsLayout from "@/features/forumPost/PostsLayout";

export default async function Page() {
  return (
      <div className="md:min-w-[480px] max-w-[1080px] w-full">
        <CreatePostLayout />
        <PostsLayout />
      </div>
  )
}
