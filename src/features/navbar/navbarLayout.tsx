import { checkUser } from "../cookies"
import LoginNavbarLayout from "../sign-in/loginNavbarLayout"
import ThemeToogle from "../themeToogle/ThemeToogle"
export default async function NavbarLayout() {
  const user = await checkUser()
  return (
    <nav className="w-full flex flex-row-reverse md:flex-row py-1 justify-between bg-secondary text-foreground items-center px-1">
      <ol className="md:flex flex-row w-full gap-2 hidden">
        <li>Home</li>
        <li>Products</li>
        <li>Sales</li>
        <li>Settings</li>
      </ol>
      <div className="flex gap-x-1">
        <ThemeToogle />
        <LoginNavbarLayout userServer={user}/>
      </div>
    </nav>
  )
}
