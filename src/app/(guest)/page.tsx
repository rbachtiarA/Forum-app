import FirstWrapper from "@/components/wrapper/FirstWrapper";
import dynamic from "next/dynamic";

const CreatePostLayout = dynamic(() => import("@/features/feed/CreatePostLayout"), {
  loading: () => <p>Loading</p>
}) 

const PostsFeed = dynamic(() => import("@/features/feed/PostsFeed"), {
  loading: () => <p>Loading</p>
}) 
export default async function Page() {
  return (
      <FirstWrapper>
        <CreatePostLayout />
        {/* <div className="flex flex-col gap-y-2 mt-2"> */}
          {/* <h1>Timeline Post</h1> */}
          <PostsFeed />
        {/* </div> */}
      </FirstWrapper>
  )
}
