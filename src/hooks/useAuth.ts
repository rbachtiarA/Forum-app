'use client'

import { createClient } from "@/lib/supabase/client"
import { useQuery } from "@tanstack/react-query"

const fetchAuth = async () => {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()
        if(error) throw error
        return data
    } catch {
        return null
    }
}

export const useAuth = () => {
    return useQuery({
        queryKey: ['Auth'],
        queryFn: fetchAuth,
        staleTime: 1000 * 15,
        retry: false,
        refetchOnWindowFocus: false
    })
}