import Link from "next/link";

export default function MenuNavbar() {
  return (
    <ol className="md:flex flex-row gap-8 hidden font-semibold">
      <Link href={"/"} prefetch={false}>
        Home
      </Link>
      <li>Search</li>
      <li>My Posts</li>
      <Link href={"/account"} prefetch={false}>
        Settings
      </Link>
    </ol>
  );
}
