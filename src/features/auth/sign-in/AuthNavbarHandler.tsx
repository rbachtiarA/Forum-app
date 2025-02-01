'use client'
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"

export default function AuthNavbarHandler() {
  const onLogout = () => {
    const supabase = createClient()
    supabase.auth.signOut()
    return redirect('/sign-in')
  }

  return (
    <Button onClick={onLogout} variant={'destructive'}>
      Logout
    </Button>
  )
}
