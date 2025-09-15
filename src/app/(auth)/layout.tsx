import AuthProtection from "@/features/auth/AuthProtection";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProtection>
      <main className="flex-1 flex flex-col justify-center items-center h-full px-1 py-2">
        {children}
      </main>
    </AuthProtection>
  );
}
