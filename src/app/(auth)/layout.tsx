import { createSSRClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    let data = null
    try {
        const supabase = await createSSRClient()
        const { data: { user }, error } = await supabase.auth.getUser()
        if(error) throw error.name
        data = user
    } catch {
        // console.log(error);
    }
    
    if(data) return redirect('/')
    return (
        <>
            <main className="flex-1 flex flex-col justify-center items-center h-full px-1 py-2">
            {children}
            </main>
        </>
    )
}
