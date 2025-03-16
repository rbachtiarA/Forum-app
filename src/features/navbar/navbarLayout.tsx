import Link from "next/link"
import NavbarAvatarDropdown from "./NavbarAvatarDropdown"

export default function NavbarLayout() {
  return (
    <nav className="w-full flex flex-row-reverse md:flex-row p-1 justify-between bg-secondary text-foreground items-center h-[var(--navbar-height)]">
      <ol className="md:flex flex-row w-full gap-2 hidden">
        <Link href={'/'}>Home</Link>
        <li>Products</li>
        <li>Sales</li>
        <li>Settings</li>
      </ol>
      <div className="flex gap-x-1 h-full">
        <NavbarAvatarDropdown />
      </div>
    </nav>
  )
}
