import Image from "next/image";
import Link from "next/link";

export default function LogoNavbar() {
  return (
    <Link href={"/"} className="flex justify-center items-center gap-4 text-xl">
      <Image
        src={"/Kriibo-logo.svg"}
        width={40}
        height={40}
        alt="Kriibo logo"
        unoptimized
      />
      <span className="hidden md:block">Kriibo</span>
    </Link>
  );
}
