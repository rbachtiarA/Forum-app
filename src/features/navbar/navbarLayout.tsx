import { checkUser } from "../cookies"
import LoginNavbarLayout from "../sign-in/loginNavbarLayout"
import ThemeToogle from "../themeToogle/ThemeToogle"
export default async function NavbarLayout() {
  const user = await checkUser()
  return (
    <nav className="w-screen flex flex-row bg-secondary text-foreground items-center">
      <ol className="md:flex flex-row w-full gap-2 hidden">
        <li>Home</li>
        <li>Products</li>
        <li>Sales</li>
        <li>Settings</li>
      </ol>
      <ThemeToogle />
      <LoginNavbarLayout userServer={user}/>
    </nav>
  )
}
