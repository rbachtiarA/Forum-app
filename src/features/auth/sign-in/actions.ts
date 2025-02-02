import { createClient } from "@/lib/supabase/client";
import { LoginSchema } from "@/utils/schemas/LoginSchemas";
import { AuthApiError } from "@supabase/supabase-js";

export async function signinUser({ email, password }: LoginSchema) {
    try {
        const supabase = createClient()
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if(error) throw error

        return 'success'
    } catch (error) {
        if(error instanceof AuthApiError) {
            console.log(error.code)
            switch (error.code) {
                case 'invalid_credentials':
                    return 'Email / Password incorrect'
                case 'email_not_confirmed':
                    return 'Email need to be verification'
                default:
                    break
            }
        }
        return `something wrong, please try again later`
    }
    
}