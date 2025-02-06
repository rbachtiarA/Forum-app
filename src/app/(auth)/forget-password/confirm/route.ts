import { createServerSideClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('code')

    if(!query) return redirect(`/sign-in?error=INVALID_AUTH`)
    const supabase = await createServerSideClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(query)

    if(error) {
        console.log(error)
        return redirect('/sign-in?error=INVALID_AUTH')
    }
    if(data) return redirect('/')
    
}
