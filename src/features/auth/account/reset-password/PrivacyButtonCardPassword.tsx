'use client'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function PrivacyCardResetPassword() {
  const router = useRouter()
  const handleResetPassword = () => router.push('/account/privacy/reset-password')  
  return (
    <div className='w-full flex flex-col px-2'>
        <Card>
            <CardHeader>
                <CardTitle>
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Change your password, It is recommended to change your password frequently 
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={handleResetPassword}>Reset Password</Button>
            </CardFooter>
        </Card>
    </div>
  )
}
