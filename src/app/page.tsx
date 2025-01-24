import CreatePostLayout from "@/features/forumPost/createPostLayout";
import PostsLayout from "@/features/forumPost/PostsLayout";

export default async function Page() {
  return (
    <main>
      <div>
        <CreatePostLayout />
        <PostsLayout />
      </div>
    </main>
  )
}
