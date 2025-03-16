import FirstWrapper from "@/components/wrapper/FirstWrapper";
import CreatePostLayout from "@/features/feedPosts/CreatePostLayout";
import PostsLayout from "@/features/feedPosts/PostsLayout";

export default async function Page() {
  return (
      <FirstWrapper>
        <CreatePostLayout />
        <PostsLayout />
      </FirstWrapper>
  )
}
