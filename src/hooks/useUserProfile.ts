'use client'

import { getUserProfile } from "@/features/auth/action"
import { useQuery } from "@tanstack/react-query"

const fetchUserProfile = async () => {
    try {
        const userProfile = await getUserProfile()
        return userProfile
    } catch (error) {
        throw error
    }
}

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false
    })
}