
import AccountCard from '@/features/auth/account/AccountCard'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col gap-y-2 w-full'>
        <AccountCard title='Profile' buttonLabel='Setting Profile' description='Edit your username, display name, profile picture, and your bio' redirect='account/profile' />
        <AccountCard title='Privacy' buttonLabel='Setting Privacy' description='Change your email / password' redirect='account/privacy' />
    </div>
  )
}
