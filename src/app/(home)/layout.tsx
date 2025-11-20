import NavbarLayout from "@/components/navbar/navbarLayout";
import FirstWrapper from "@/components/wrapper/FirstWrapper";
import { createServerSideClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSideClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }
  return (
    <>
      <NavbarLayout />
      <main className="flex-1 flex flex-col justify-start items-center h-full mt-[var(--navbar-height)]">
        <FirstWrapper>
          <div className="flex flex-col gap-2 w-full col-start-2">
            {children}
          </div>
        </FirstWrapper>
      </main>
    </>
  );
}
