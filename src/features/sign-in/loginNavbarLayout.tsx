import LoginNavbarHandler from "@/features/sign-in/loginNavbarHandler"

export default function LoginNavbarLayout({ userServer }: { userServer: { name: string | null, email: string | null } }) {
  
  return (
    <div className="flex">
      {
        userServer?.name &&
        <div>
          <p>name: {userServer?.name || 'unknown'}</p>
        </div>
      }
      <LoginNavbarHandler />
    </div>
  )
}
