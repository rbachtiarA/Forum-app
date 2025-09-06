import GuestProtection from "@/features/auth/GuestProtection";
import NavbarLayout from "@/components/navbar/navbarLayout";
import { ReactNode } from "react";
import FirstWrapper from "@/components/wrapper/FirstWrapper";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <NavbarLayout />
      <GuestProtection>
        <main className="flex-1 flex flex-col justify-start items-center h-full">
          <FirstWrapper>{children}</FirstWrapper>
        </main>
      </GuestProtection>
    </>
  );
}
