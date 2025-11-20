"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function ThemeToogleTextWithIcon({ cb }: { cb?: () => void }) {
  const { setTheme, theme } = useTheme();

  const handleClickTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (cb) {
      cb();
    }
  };

  return (
    <>
      <button className={"flex w-full gap-2"} onClick={handleClickTheme}>
        {theme === "light" ? <Sun /> : <Moon />}
        <p>Change Theme</p>
      </button>
    </>
  );
}
