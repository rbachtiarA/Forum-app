import FirstWrapper from "@/components/wrapper/FirstWrapper";
import dynamic from "next/dynamic";

const CreatePostLayout = dynamic(() => import("@/features/feedPosts/CreatePostLayout"), {
  loading: () => <p>Loading</p>
}) 

const PostsLayout = dynamic(() => import("@/features/feedPosts/PostsLayout"), {
  loading: () => <p>Loading</p>
}) 
export default async function Page() {
  return (
      <FirstWrapper>
        <CreatePostLayout />
        <PostsLayout />
      </FirstWrapper>
  )
}
