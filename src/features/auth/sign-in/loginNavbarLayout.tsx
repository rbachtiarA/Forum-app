import Link from "next/link"
import { getUserProfile } from "../getUser"
import AuthNavbarHandler from "./AuthNavbarHandler"

export default async function LoginNavbarLayout({ userServer }: { userServer: { userId: string | null, email: string | null } }) {
  const user = await getUserProfile(userServer.userId!)
  
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
