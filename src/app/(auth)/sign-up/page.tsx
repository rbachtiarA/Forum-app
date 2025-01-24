import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import RegisterLayout from '@/features/sign-up/SignupLayout'
import Link from 'next/link'

export default async function Page() {
  return (
    <Card className='md:max-w-[480px]'>
      <CardHeader>
        <CardTitle>
          Sign-up Account
        </CardTitle>
        <CardDescription>
          <p>Welcome to Kriibo App</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterLayout />
        <p className='mt-2'>Already a member of Kriibo ? <Link href={'/sign-in'} className="text-primary">Login here</Link></p>
      </CardContent>
      <CardFooter className='flex flex-col gap-y-4'>
        <div className='w-full flex items-center gap-x-2'>
          <div className='w-full h-[1px] border-t-2' />
          <span className='text-nowrap text-sm text-foreground'>or sign-up with</span>
          <div className='w-full h-[1px] border' />
        </div>
        <Button variant={'outline'} className='w-full font-semibold'>Sign-up with Google Account</Button>
      </CardFooter>
    </Card>
  )
}
