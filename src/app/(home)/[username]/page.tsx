import PostContainer from "@/features/feed/Feed.list";
import ProfileActionButton from "@/features/feed/permission/ProfileActionButton";
import { userPermission } from "@/features/feed/permission/userPermission";
import UserProfileHeader from "@/features/feed/UserProfileHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  return {
    title: `Kriibo - ${username}`,
    description: `Kriibo - ${username}`,
    openGraph: {
      title: `Kriibo - ${username}`,
      description: `Kriibo - ${username}`,
      url: `https://kriibo.vercel.app/${username}`,
      siteName: "Kriibo",
      type: "website",
    },
  };
}
export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const { userProfile, permission } = await userPermission(username);

  if (!userProfile)
    return (
      <div>
        <h1 className="text-6xl">Invalid User</h1>
      </div>
    );

  return (
    <>
      <UserProfileHeader userProfile={userProfile} />
      <ProfileActionButton permission={permission} />
      <PostContainer username={username} />
    </>
  );
}
