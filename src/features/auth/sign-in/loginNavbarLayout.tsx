import Link from "next/link"
import AuthNavbarHandler from "./AuthNavbarHandler"
import { getUserProfile } from "@/features/forumPost/permission/userPermission"

export default async function LoginNavbarLayout({ userServer }: { userServer: { userId: string | null, email: string | null } }) {
  const user = await getUserProfile(userServer.userId!)

  if(!user) return <></>
  const { username } = user!
  return (
    <div className="flex justify-center items-center gap-x-2">
      {
        username &&
        <Link href={`/${username}`} className="hover:underline">
          <p>{username || 'unknown'}</p>
        </Link>
      }
      { 
        user && 
        <AuthNavbarHandler />
      }
      {/* <LoginNavbarHandler /> */}
    </div>
  )
}
