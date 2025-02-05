import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import SigninGoogleButton from '@/features/auth/sign-in/SigninGoogleButton'
import SigninLayout from '@/features/auth/sign-in/SigninLayout'
import Link from 'next/link'

export default async function Page() {
  return (
    <Card className='md:max-w-[480px]'>
      <CardHeader>
        <CardTitle>
          Login Account
        </CardTitle>
        <CardDescription>
          <p>Welcome to Kriibo App</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SigninLayout />
        <p className='mt-2'>Became new member of Kriibo community, <Link href={'/sign-up'} className='text-primary'>Sign-up here</Link></p>
      </CardContent>
      <CardFooter className='flex flex-col gap-y-4'>
        <div className='w-full flex items-center gap-x-2'>
          <div className='w-full h-[1px] border-t-2' />
          <span className='text-nowrap text-sm text-foreground'>or login with</span>
          <div className='w-full h-[1px] border' />
        </div>
        <SigninGoogleButton />
      </CardFooter>
    </Card>
  )
}
