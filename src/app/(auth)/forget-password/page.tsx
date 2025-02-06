import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FirstWrapper from '@/components/wrapper/FirstWrapper'
import SendResetPasswordEmail from '@/features/auth/profile/reset-password/SendResetPasswordEmail'
import React from 'react'

export default function page() {
    
  return (
    <FirstWrapper>
        <Card>
            <CardHeader>
                <CardTitle>Forget your password ?</CardTitle>
                <CardDescription>Insert your email here, we will send you verification link</CardDescription>
            </CardHeader>
            <CardContent>
                <Input type='email' className='w-full' placeholder='ex: email@example.com'/>
            </CardContent>
            <CardFooter className='flex w-full justify-end'>
                <SendResetPasswordEmail />
            </CardFooter>
        </Card>
    </FirstWrapper>
  )
}
