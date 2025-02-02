'use server'

import prisma from "@/lib/prisma"
import { createAdminClient } from "@/lib/supabase/server"
import { RegisterSchema } from "@/utils/schemas/RegisterSchema"
import { AuthApiError } from "@supabase/supabase-js"

export async function signupUser(formData: RegisterSchema) {
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
    // const { data: verificationLink , error: errorLink } = await supabase.auth.admin.generateLink({
    //     type: 'signup',
    //     email: email,
    //     password: password
    // })
    // if(errorLink) throw errorLink

    // console.log(verificationLink);
    
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