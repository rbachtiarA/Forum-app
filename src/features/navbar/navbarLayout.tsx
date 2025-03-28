import Link from "next/link"
import NavbarAvatarDropdown from "./NavbarAvatarDropdown"
import Image from "next/image"

export default function NavbarLayout() {
  return (
    <nav className="w-full flex justify-between items-center p-1 bg-secondary text-foreground h-[var(--navbar-height)] md:px-10 py-2">
      <div className="flex justify-center items-center gap-4 text-xl">
        <Image src={'/Kriibo-logo.svg'} width={40} height={40} alt="Kriibo logo"/>
        <h1>Kriibo</h1>
      </div>
      <ol className="md:flex flex-row gap-8 hidden font-semibold">
        <Link href={'/'}>Home</Link>
        <li>Search</li>
        <li>My Posts</li>
        <Link href={'/account'}>Settings</Link>
      </ol>
      <div className="flex gap-x-1 w-[44px]">
        <NavbarAvatarDropdown />
      </div>
    </nav>
  )
}
