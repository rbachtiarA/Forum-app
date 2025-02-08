'use client'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import React, { useState } from 'react'

export default function SendResetPasswordEmail() {
    const [sent, setSent] = useState(false)
    const supabase = createClient()
    const handleButton = async () => {
        await supabase.auth.resetPasswordForEmail('markoliver0405@gmail.com', {
            redirectTo: `${process.env.NEXT_PUBLIC_HOSTNAME_URL}/account/privacy/reset-password`
        })
        setSent(true)
    } 
  return (
    <Button onClick={handleButton} disabled={sent}>
        Send reset verification
    </Button>
  )
}
