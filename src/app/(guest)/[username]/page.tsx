import FirstWrapper from "@/components/wrapper/FirstWrapper"
import SecondWrapper from "@/components/wrapper/secondWrapper"
import ProfileActionButton from "@/features/forumPost/permission/ProfileActionButton"
import { userPermission } from "@/features/forumPost/permission/userPermission"
import PostTemplate from "@/features/forumPost/PostTemplate"
import ProfileHeader from "@/features/forumPost/ProfileHeader"

export default async function page({ params }: { params: Promise<{username: string}> }) {
  const currentDate = new Date()
  const username = (await params).username
  const { data, error } = await userPermission(username)
  if(error || !data) return (
    <div>
      <h1 className="text-6xl">Invalid User</h1>
    </div>
  )

  if(!data.posts.length) return (
    <div>
      <h1>User has not post anything yet</h1>
    </div>
  )
  return (
    <FirstWrapper>
      <SecondWrapper>
        <ProfileHeader userProfile={data.userProfile}/>
        <ProfileActionButton permission={data.permission} />
        <div className="flex flex-col gap-y-2">
          {data.posts!.map((post) => (
                <PostTemplate key={post.id} post={post} currentDate={currentDate} />
            ))}
        </div>
      </SecondWrapper>
    </FirstWrapper>
  )
}
