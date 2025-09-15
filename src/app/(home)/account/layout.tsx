import { LockIcon, UserCogIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className='grid grid-cols-[240px_1fr] w-full h-[calc(100vh-var(--navbar-height))]'>
        <aside className='min-w-[240px] max-w-[480px] h-full flex flex-col gap-y-4 justify-between bg-secondary pl-2'>
            {/* BRAND LOGO */}
            <div>
                {/* Logo */}
            </div>

            {/* CONTENT */}
            <div className='flex flex-col space-y-2 w-full flex-1'>
                {/* change username, display name, bio */}
                <Link href={'/account/profile'} className='flex gap-x-1 items-center hover:underline font-bold' prefetch={false}>
                    <UserCogIcon size={'1em'}/>
                    Profile
                </Link>
                {/* change password & email */}
                <Link href={'/account/privacy'} className='flex gap-x-1 items-center hover:underline font-bold' prefetch={false}>
                    <LockIcon size={'1em'}/>
                    Privacy
                </Link>
            </div>

            {/* PROFILE USER */}
            <div className='w-full'>
                {/* <UserSimpleCard /> */}
            </div>
        </aside>
        <div className='px-2 py-1 flex w-full justify-center overflow-auto'>
            {children}
        </div>
    </div>
  )
}
