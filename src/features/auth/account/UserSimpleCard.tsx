'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChevronsUpDownIcon } from 'lucide-react'

export default function UserSimpleCard() {
  return (
    <div className='flex gap-2 w-full justify-between items-center p-2'>
        <Avatar>
            <AvatarImage src=''/>
            <AvatarFallback>DF</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
            <p>Name</p>
            <p className='text-muted-foreground'>username</p>
        </div>
        <div>
            <ChevronsUpDownIcon />
        </div>
    </div>
  )
}
