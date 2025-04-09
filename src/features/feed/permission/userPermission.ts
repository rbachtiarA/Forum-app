import prisma from "@/lib/prisma"
import { createServerSideClient } from "@/lib/supabase/server"

type PermissionAuth = 'OWNER' | 'VISITOR'

export async function userPermission(username: string) {
    let permission: PermissionAuth = "VISITOR"
    const supabase = await createServerSideClient()
    const { data: { user: userVisitor } } = await supabase.auth.getUser()
    
    const userOwner = await prisma.profile.findUnique({
        where: {
            username
        },
    })
    if(!userOwner || !userVisitor) return { userProfile: null, permission }
    if(userOwner.id === userVisitor.id) permission = 'OWNER'
    return {
        userProfile: { ...userOwner
        //   name: userOwner.name,
        //   username: userOwner.username,
        //   picture: userOwner.picture,  
        //   bio: userOwner.bio
        },
        permission
    }
}