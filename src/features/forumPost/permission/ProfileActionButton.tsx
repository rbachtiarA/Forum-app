'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ProfileActionButton({ permission }: { permission: 'OWNER' | 'VISITOR' }) {
    const router = useRouter()
    const onEditProfile = () => router.push('/account')
  return (
    <div className='flex gap-x-4'>
        {
            permission === 'OWNER' &&
            <Button onClick={onEditProfile}>
                Edit Profile
            </Button>
        }
        {
            permission === 'VISITOR' &&
            <>
                <Button>
                    Add Friend
                </Button>
                <Button variant={'outline'}>
                    Private message
                </Button>
            </>    
        }
    </div>
  )
}
