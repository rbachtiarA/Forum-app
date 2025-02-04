import { ReactNode } from "react";

export default async function AuthLayout({ children }: { children: ReactNode }) {
    // const supabase = await createServerSideClient()
    // const { data: { user }, error } = await supabase.auth.getUser()
    // if(error) throw error.name
    
    // if(user) return redirect('/')
    return (
        <>
            <main className="flex-1 flex flex-col justify-center items-center h-full px-1 py-2">
            {children}
            </main>
        </>
    )
}
