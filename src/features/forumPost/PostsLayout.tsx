import { PostLists } from "./PostLists"

export default async function PostsLayout() {
  return (
    <div className="flex flex-col gap-y-2 mt-2">
        <h1>Timeline Post</h1>
        <PostLists />
    </div>
  )
}
