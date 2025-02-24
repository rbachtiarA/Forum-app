'use client'
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useQueryClient } from "@tanstack/react-query"
import { redirect } from "next/navigation"

export default function AuthNavbarHandler() {
  const queryClient = useQueryClient()
  const supabase = createClient()

  const onLogout = () => {
    queryClient.invalidateQueries()  
    supabase.auth.signOut()
    return redirect('/sign-in')
  }

  return (
    <Button onClick={onLogout} variant={'destructive'}>
      Logout
    </Button>
  )
}
