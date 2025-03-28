'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserProfile } from '@/hooks/useUserProfile'
import { UserRound, UserRoundCog } from 'lucide-react'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import SignoutButton from '../auth/sign-in/SignoutButton'
import ThemeToogleTextWithIcon from '../themeToogle/ThemeToogleTextWithIcon'

function DropdownItem({ children }: { children: ReactNode }) {
  return (
    <div className='px-2 py-1 w-full rounded-md flex hover:bg-popover'>
      {children}
    </div>
  )
}

function AvatarProfile({picture, username}: {picture: string, username: string}) {
  return (
    <Avatar>
      <AvatarImage src={picture??''} />
      <AvatarFallback>{username.slice(0,1)}</AvatarFallback>
    </Avatar>
  )
}

export default function NavbarAvatarDropdown() {
  const { data, isLoading } = useUserProfile()
  const [isDropdown, setIsDropdown] = useState(false)

  useEffect(() => {
    const eventClick = () => {
      setIsDropdown(false)
      return document.removeEventListener('click', eventClick)
    }
    if(isDropdown) {
      document.addEventListener('click', eventClick)
    }
  }, [isDropdown])

  return (
    <>
      {
        isLoading && 
        <div className='animate-pulse'>
          <div className='w-[40px] h-[40px] rounded-full bg-gray-500'></div>
        </div>
      }
      {
        data &&
        <div className='relative w-full flex justify-center items-center'>
          <button className='hover:grayscale-[50%] transition border-2 rounded-full border-primary' onClick={() => setIsDropdown((prev) => !prev)}>
            <AvatarProfile picture={data.picture??''} username={data.username} />
          </button>
          <div className={`${isDropdown?  `right-0 top-[50px] w-[200px] absolute` : 'hidden'} bg-secondary rounded-md border-primary border flex flex-col gap-2 p-2`}>
            <div className='flex gap-2 items-center font-semibold text-sm'>
              <AvatarProfile picture={data.picture??''} username={data.username} />
              <p>{data.name}</p>
            </div>
            <div className='h-[2px] w-full border-1 bg-muted-foreground'></div>
            <DropdownItem>
              <Link className='flex w-full gap-2' href={`/${data.username}`}>
                <UserRound />
                Profile
              </Link>
            </DropdownItem>
            <DropdownItem>
              <ThemeToogleTextWithIcon />
            </DropdownItem>
            <DropdownItem>
              <Link className='flex w-full gap-2' href={'/account'}> 
                <UserRoundCog />
                My Account
              </Link>
            </DropdownItem>
            
            <SignoutButton />
            
          </div>
        </div>
      }
    </>
  )
}
