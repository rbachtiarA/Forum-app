import Link from "next/link"
import NavbarAvatarDropdown from "./NavbarAvatarDropdown"

export default function NavbarLayout() {
  return (
    <nav className="w-full flex flex-row-reverse md:flex-row justify-between items-center p-1 bg-secondary text-foreground h-[var(--navbar-height)] md:px-10 py-2">
      <div className="flex w-[44px]">
      </div>
      <ol className="md:flex flex-row gap-8 hidden font-semibold">
        <Link href={'/'}>Home</Link>
        <li>Search</li>
        <li>My Posts</li>
        <li>Settings</li>
      </ol>
      <div className="flex gap-x-1 w-[44px]">
        <NavbarAvatarDropdown />
      </div>
    </nav>
  )
}
