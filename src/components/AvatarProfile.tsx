import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getImageProps } from "next/image";

export default function AvatarProfile({
  src,
  width,
  height,
  alt,
  username,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  username: string;
}) {
  const { props } = getImageProps({ src, width, height, alt });
  return (
    <Avatar>
      <AvatarImage {...props} />
      <AvatarFallback className="bg-secondary text-secondary-foreground">
        {username.toUpperCase()[0]}
      </AvatarFallback>
    </Avatar>
  );
}
