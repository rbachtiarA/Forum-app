"use client";
import { getImageProps } from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IMAGE } from "@/constant/image";

export default function AvatarProfile({
  src,
  alt,
  username = "DEFAULT",
}: {
  src?: string | null;
  // width: number;
  // height: number;
  alt: string;
  username?: string;
}) {
  // const defaultSrc = "/image/default-avatar.png";
  const { props } = getImageProps({
    src: src || "",
    width: IMAGE.AVATAR.size,
    height: IMAGE.AVATAR.size,
    alt,
  });

  return (
    <Avatar>
      <AvatarImage
        {...props}
        // onError={(e) => (e.currentTarget.src = defaultSrc)}
      />
      <AvatarFallback className="bg-secondary text-secondary-foreground">
        <span>{username.slice(0, 2).toUpperCase()}</span>
      </AvatarFallback>
    </Avatar>
  );
}
