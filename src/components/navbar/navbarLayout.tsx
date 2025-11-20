import Searchbar from "@/features/navbar/searchbar";
import LogoNavbar from "./logoNavbar";
import NavbarAvatarDropdown from "@/features/navbar/profile-dropdown";

export default function NavbarLayout() {
  return (
    <nav className="fixed top-0 w-full flex justify-center bg-navbar-background z-50">
      <div className="w-full flex justify-between items-center text-foreground h-(--navbar-height) px-4 md:px-32 xl:px-64 py-4 border-b-2 border-border shadow-sm">
        <LogoNavbar />
        <Searchbar />
        <div className="flex gap-x-1 w-[45px]">
          <NavbarAvatarDropdown />
        </div>
      </div>
    </nav>
  );
}
