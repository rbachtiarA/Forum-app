'use client'
import { useAuth } from "@/provider/AuthProvider"

export default function LoginNavbarHandler() {
  const { user, onLogout } = useAuth()
  return (
    <div className="flex gap-2">
      {!user?.name && !user?.email && <a className="bg-primary text-primary-foreground px-4 py-2" href="/sign-in">Login</a>}
      {user?.name && user?.email && <button className="bg-primary text-primary-foreground px-4 py-2" onClick={onLogout}>Logout</button>}
    </div>
  )
}
