import Image from "next/image";

export default function LogoNavbar() {
  return (
    <div className="flex justify-center items-center gap-4 text-xl">
      <Image
        src={"/Kriibo-logo.svg"}
        width={40}
        height={40}
        alt="Kriibo logo"
      />
      <h1>Kriibo</h1>
    </div>
  );
}
