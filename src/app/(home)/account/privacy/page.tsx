import AccountCard from '@/features/auth/account/AccountCard'

export default function page() {
  return (
    <div className='w-full flex flex-col gap-y-2'>
        <AccountCard title='Reset Password' buttonLabel='Reset Password' description='Change your password, It is recommended to change your password frequently' redirect='privacy/reset-password' />
        <AccountCard title='Change User Email' buttonLabel='Change Email' description='Change your email, make sure your email is active' redirect='privacy/change-email' />
    </div>
  )
}
