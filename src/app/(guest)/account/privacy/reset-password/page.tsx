import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FirstWrapper from '@/components/wrapper/FirstWrapper'
import FormResetPassword from '@/features/auth/profile/reset-password/FormResetPassword'
import React from 'react'

export default function page() {
  return (
    <FirstWrapper>
        <Card>
            <CardHeader>
                <CardTitle>
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Please use strong password, a combination of alpanumeric and uppercase letter
                </CardDescription>
            </CardHeader>
            <CardContent>
                <FormResetPassword />
            </CardContent>
        </Card>
    </FirstWrapper>
  )
}
