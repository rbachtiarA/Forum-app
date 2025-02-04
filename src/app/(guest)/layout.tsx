import NavbarLayout from "@/features/navbar/navbarLayout";
import { createServerSideClient } from "@/lib/supabase/server";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const supabase = await createServerSideClient()
    const user = await supabase.auth.getUser()
    // if(!user.data.user) return redirect('/sign-in')
    return (
        <>
            <NavbarLayout user={user.data.user!}/>
            <main className="flex-1 flex flex-col justify-center items-center h-full px-1 py-2">
                {children}
            </main>
        </>
    )
}
