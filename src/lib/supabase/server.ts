'use server'
import { createServerClient, serializeCookieHeader } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
export async function createSSRClient() {
    const cookiesStore = await cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiesStore.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.map(({name, value, options}) => {
                            serializeCookieHeader(name, value, options)
                        }
                    )
                }
            },  
        }
    ) 
}

export async function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )  
}