"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image, { getImageProps } from "next/image";

export default function AvatarProfile({
  src,
  width,
  height,
  alt,
  username = "DEFAULT",
}: {
  src?: string | null;
  width: number;
  height: number;
  alt: string;
  username?: string;
}) {
  const defaultSrc = "/image/default-avatar.png";
  const { props } = getImageProps({
    src: src || defaultSrc,
    width,
    height,
    alt,
  });

  return (
    <Avatar>
      <AvatarImage
        {...props}
        onError={(e) => (e.currentTarget.src = defaultSrc)}
      />
      <AvatarFallback className="bg-secondary text-secondary-foreground">
        {username.toUpperCase()[0]}
      </AvatarFallback>
    </Avatar>
  );
}
