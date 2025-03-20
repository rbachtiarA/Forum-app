'use client'

import { getUserProfile } from "@/features/auth/action"
import { useQuery } from "@tanstack/react-query"

const fetchUserProfile = async () => {
    const { user } = await getUserProfile()
    return user
}

export const useUserProfile = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: fetchUserProfile,
        staleTime: 1000 * 60 * 5,
        retry: false
    })
}