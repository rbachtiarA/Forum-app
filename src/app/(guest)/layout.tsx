import { createSSRClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    const supabase = await createSSRClient()
    const { data } = await supabase.auth.getUser()
    if(!data.user) return redirect('/sign-in')
    return (
        <>
            {children}
        </>
    )
}
