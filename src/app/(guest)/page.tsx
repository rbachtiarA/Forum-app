import FirstWrapper from "@/components/wrapper/FirstWrapper";
import CreatePostLayout from "@/features/forumPost/CreatePostLayout";
import PostsLayout from "@/features/forumPost/PostsLayout";

export default async function Page() {
  return (
      <FirstWrapper>
        <CreatePostLayout />
        <PostsLayout />
      </FirstWrapper>
  )
}
