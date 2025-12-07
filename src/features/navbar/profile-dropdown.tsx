"use client";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRound, UserRoundCog } from "lucide-react";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";
import SignoutButton from "../../features/auth/sign-in/SignoutButton";
import ThemeToogleTextWithIcon from "../../features/themeToogle/ThemeToogleTextWithIcon";
import AvatarProfile from "@/components/AvatarProfile";

function DropdownItem({ children }: { children: ReactNode }) {
  return (
    <div className="px-2 py-1 w-full rounded-md flex hover:bg-accent">
      {children}
    </div>
  );
}

export default function NavbarAvatarDropdown() {
  const { data, isLoading } = useUserProfile();
  const [isDropdown, setIsDropdown] = useState(false);
  const toggleDropdown = () => setIsDropdown(!isDropdown);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdown(false);
    }
  };
  const handleClickItem = () => {
    setIsDropdown(false);
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="animate-pulse">
          <div className="w-[40px] h-[40px] rounded-full bg-gray-500"></div>
        </div>
      )}

      {data && (
        <div
          className="relative w-full flex justify-center items-center z-10"
          id="profile-dropdown"
          ref={dropdownRef}
        >
          <button
            className="hover:grayscale-50 transition border-2 rounded-full border-primary"
            onClick={toggleDropdown}
          >
            <AvatarProfile
              src={data.picture}
              alt="your avatar"
              username={data.username}
            />
          </button>
          {isDropdown && (
            <div
              className={`right-0 top-[50px] w-[200px] absolute bg-navbar-background rounded-md border border-border flex flex-col gap-2 p-2 shadow-md shadow-secondary`}
            >
              <div className="flex gap-2 items-center font-semibold text-sm">
                <AvatarProfile
                  src={data.picture}
                  alt="your avatar"
                  username={data.username}
                />
                <p>{data.name}</p>
              </div>
              <div className="h-[2px] w-full border bg-muted-foreground"></div>
              <DropdownItem>
                <Link
                  className="flex w-full gap-2"
                  href={`/${data.username}`}
                  prefetch={false}
                  onClick={handleClickItem}
                >
                  <UserRound />
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem>
                <ThemeToogleTextWithIcon />
              </DropdownItem>
              <DropdownItem>
                <Link
                  className="flex w-full gap-2"
                  href={"/account"}
                  onClick={handleClickItem}
                >
                  <UserRoundCog />
                  My Account
                </Link>
              </DropdownItem>

              <SignoutButton />
            </div>
          )}
        </div>
      )}
    </>
  );
}
