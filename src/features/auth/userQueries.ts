import { queryOptions } from "@tanstack/react-query"
import { getUserProfile } from "./action"

const fetchUserProfile = async () => {
    try {
        const userProfile = await getUserProfile()
        return userProfile
    } catch (error) {
        throw error
    }
}

export const userOptions = queryOptions({
    queryKey: ["userProfile"],
    queryFn: async () => {
        return await fetchUserProfile()
    },
    refetchOnWindowFocus: false
})