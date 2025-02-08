import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import FormResetPassword from '@/features/auth/account/reset-password/FormResetPassword'

export default function page() {
  return (
    <div className='h-full w-full flex justify-center items-center'>
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
    </div>
  )
}
