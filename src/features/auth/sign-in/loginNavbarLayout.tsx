import { getUserProfile } from "../getUser"
import AuthNavbarHandler from "./AuthNavbarHandler"

export default async function LoginNavbarLayout({ userServer }: { userServer: { userId: string | null, email: string | null } }) {
  const user = await getUserProfile(userServer.userId!)
  
  const { username } = user!
  return (
    <div className="flex justify-center items-center gap-x-2">
      {
        username &&
        <div>
          <p>{username || 'unknown'}</p>
        </div>
      }
      { 
        user && 
        <AuthNavbarHandler />
      }
      {/* <LoginNavbarHandler /> */}
    </div>
  )
}
