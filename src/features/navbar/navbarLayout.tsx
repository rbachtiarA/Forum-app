import { User } from "@supabase/supabase-js"
import LoginNavbarLayout from "../auth/sign-in/loginNavbarLayout"
import ThemeSwitcher from "../themeToogle/ThemeSwitcher"

export default async function NavbarLayout({  user }: { user: User}) {
  // const user = await getUserSession()
  // if(!user) return redirect('/sign-in')
  return (
    <nav className="w-full flex flex-row-reverse md:flex-row py-1 justify-between bg-secondary text-foreground items-center px-1">
      <ol className="md:flex flex-row w-full gap-2 hidden">
        <li>Home</li>
        <li>Products</li>
        <li>Sales</li>
        <li>Settings</li>
      </ol>
      <div className="flex gap-x-1">
        <ThemeSwitcher />
        <LoginNavbarLayout userServer={{email: user.email!, userId: user.id}}/>
      </div>
    </nav>
  )
}
