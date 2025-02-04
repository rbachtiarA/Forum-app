import { Button } from '@/components/ui/button'
import React from 'react'

export default function ProfileActionButton({ permission }: { permission: 'OWNER' | 'VISITOR' }) {

  return (
    <div className='flex gap-x-4'>
        {
            permission === 'OWNER' &&
            <Button>
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
