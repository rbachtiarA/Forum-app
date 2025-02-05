'use server'

import prisma from "@/lib/prisma"
import { createAdminClient, createServerSideClient } from "@/lib/supabase/server"
import { type LoginSchema } from "@/utils/schemas/LoginSchemas"
import { type RegisterSchema } from "@/utils/schemas/RegisterSchema"
import { AuthApiError } from "@supabase/supabase-js"
import { redirect } from "next/navigation"

export async function signupAuthAction(formData: RegisterSchema) {
  try {
    const { email, password } = formData
    
    if(!email || !password) throw 'Credentials invalid'
    const supabase = await createAdminClient()
    
    const { data, error: errorCreateUser } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      // TODO : DEMO ONLY TO BYPASS VERIFICATION
      email_confirm: true
    })

    if(errorCreateUser) throw errorCreateUser

    //TODO : Add Nodemailer with template / use supabase signup
    
    const generateUsername = email.split('@')[0]
    await prisma.profile.create({
        data: {
            id: data.user.id,
            username: generateUsername,
            picture: ''
        }
    })

    return `Success`
  } catch (err){
    if(err instanceof AuthApiError) {
      switch (err.code) {
        case 'email_exists':
          return 'Email already exist'
        case 'invalid_credentials':
          return 'Invalid Credentials'
      } 
    }
  return 'Something wrong, please try again later'
  }
}

export async function signinAuthAction({ email, password }: LoginSchema) {
    try {
        const supabase = await createServerSideClient()
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if(error) throw error

        return 'success'
    } catch (error) {
        if(error instanceof AuthApiError) {
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

export async function signinGoogleAuthAction() {
  const supabase = await createServerSideClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  
  console.log(data, error);
}

export async function signoutAuthAction() {
  const supabase = await createServerSideClient()
  await supabase.auth.signOut();
  return redirect("/sign-in")
}