import NavbarLayout from "@/features/navbar/navbarLayout";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <NavbarLayout/>
            <main className="flex-1 flex flex-col justify-start items-center h-full">
                {children}
            </main>
        </>
    )
}
