import LogoNavbar from "./logoNavbar";
import MenuNavbar from "./menuNavbar";
import NavbarAvatarDropdown from "./NavbarAvatarDropdown";

export default function NavbarLayout() {
  return (
    <nav className="w-full flex justify-center bg-secondary">
      <div className="w-full flex justify-between items-center text-foreground h-(--navbar-height) px-4 md:px-64 py-4">
        <LogoNavbar />
        <MenuNavbar />
        <div className="flex gap-x-1 w-[44px]">
          <NavbarAvatarDropdown />
        </div>
      </div>
    </nav>
  );
}
