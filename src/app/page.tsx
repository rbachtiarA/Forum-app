import CreatePostLayout from "@/features/forumPost/CreatePostLayout";
import PostsLayout from "@/features/forumPost/PostsLayout";

export default async function Page() {
  return (
    <main>
      <div className="md:min-w-[480px] w-full">
        <CreatePostLayout />
        <PostsLayout />
      </div>
    </main>
  )
}
