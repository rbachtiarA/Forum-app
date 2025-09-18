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

  if (user) {
    redirect("/");
  }

  return (
    <>
      {/* <AuthProtection> */}
      <main className="flex-1 flex flex-col justify-center items-center h-full px-1 py-2">
        {children}
      </main>
      {/* </AuthProtection> */}
    </>
  );
}
