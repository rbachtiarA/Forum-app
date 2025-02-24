'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRightCircleIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export default function AccountCard({
    title,
    description,
    redirect,
    buttonLabel,
    children
}:{
    title: string,
    description: string,
    redirect: string
    buttonLabel: string,
    children?: ReactNode
}) {
  const router = useRouter()
  const handleResetPassword = () => router.push(`${redirect}`)  
  return (
    <div className='w-full flex flex-col'>
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description} 
                </CardDescription>
            </CardHeader>
            {
                children &&
                <CardContent>
                    {children}
                </CardContent>
            }
            <CardFooter className='w-full flex justify-end'>
                <Button onClick={handleResetPassword}>
                    {buttonLabel}
                    <ChevronRightCircleIcon/>
                </Button>
            </CardFooter>
        </Card>
    </div>
  )
}
