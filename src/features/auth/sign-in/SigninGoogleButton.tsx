'use client'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import React from 'react'

export default function SigninGoogleButton() {
    const supabase = createClient()
    const handleLoginButton = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/auth'
            }
        })
    }

  return (
    <Button variant={'outline'} className='w-full font-semibold' onClick={handleLoginButton}>Login with Google Account</Button>
  )
}
