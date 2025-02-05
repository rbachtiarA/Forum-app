import prisma from "@/lib/prisma";
import { createServerSideClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('code')

    if(!query) redirect('/sign-in')
    const supabase = await createServerSideClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(query)

    if(data.user) {
        const userProfile = await prisma.profile.findUnique({
            where: {
                id: data.user.id
            }
        })

        if(!userProfile) {
            await prisma.profile.create({
                data: {
                    id: data.user!.id,
                    username: data.user.email!.split('@')[0],
                    picture: ''
                }
            })
        }
        return redirect('/')
    }

    if(error) {
        return redirect('/sign-in')
    }
}