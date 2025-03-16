import FirstWrapper from "@/components/wrapper/FirstWrapper"
import SecondWrapper from "@/components/wrapper/secondWrapper"
import UserPostsFeed from "@/features/feedPosts/UserPostsFeed"
import ProfileActionButton from "@/features/feedPosts/permission/ProfileActionButton"
import { userPermission } from "@/features/feedPosts/permission/userPermission"
import ProfileHeader from "@/features/feedPosts/ProfileHeader"

export default async function page({ params }: { params: Promise<{username: string}> }) {
  
  const username = (await params).username
  const { userProfile, permission } = await userPermission(username)

  if(!userProfile) return (
    <div>
      <h1 className="text-6xl">Invalid User</h1>
    </div>
  )

  return (
    <FirstWrapper>
      <SecondWrapper>
        <ProfileHeader userProfile={userProfile}/>
        <ProfileActionButton permission={permission} />
        <UserPostsFeed username={username}/>
      </SecondWrapper>
    </FirstWrapper>
  )
}
