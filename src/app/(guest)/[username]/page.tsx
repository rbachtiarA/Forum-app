import FirstWrapper from "@/components/wrapper/FirstWrapper"
import { getPostsUser } from "@/features/forumPost/action"
import PostTemplate from "@/features/forumPost/PostTemplate"

export default async function page({ params }: { params: Promise<{username: string}> }) {
  const currentDate = new Date()
  const username = (await params).username
  const { data: posts, error } = await getPostsUser(username)
  if(error) return (
    <div>
      <h1 className="text-6xl">Invalid User</h1>
    </div>
  )

  if(!posts?.length) return (
    <div>
      <h1>User has not post anything yet</h1>
    </div>
  )
  return (
    <FirstWrapper>
      <div className="flex flex-col gap-y-2">
        {posts!.map((post) => (
              <PostTemplate key={post.id} post={post} currentDate={currentDate} />
          ))}
      </div>
    </FirstWrapper>
  )
}
