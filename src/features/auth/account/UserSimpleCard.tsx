'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserProfile } from '@/hooks/useUserProfile'
import { ChevronsUpDownIcon } from 'lucide-react'

export default function UserSimpleCard() {
  const { data, isLoading } = useUserProfile()
  if(isLoading) {
    return (
      <div className='flex gap-2 w-full justify-between items-center p-2'>
        <Avatar>
            <AvatarImage src=''/>
            <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className='flex-1'>
            <p>loading...</p>
            <p className='text-muted-foreground'>loading...</p>
        </div>
        <div>
            <ChevronsUpDownIcon />
        </div>
    </div>
    )
  }

  return (
    <div className='flex gap-2 w-full justify-between items-center p-2'>
        <Avatar>
            <AvatarImage src=''/>
            <AvatarFallback>DF</AvatarFallback>
        </Avatar>
        <div className='flex-1'>
            <p>{data?.username}</p>
            <p className='text-muted-foreground'>{data?.username}</p>
        </div>
        <div>
            <ChevronsUpDownIcon />
        </div>
    </div>
  )
}
