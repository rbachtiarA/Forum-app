'use server'

import prisma from "@/lib/prisma"
import { createAdminClient, createServerSideClient } from "@/lib/supabase/server"
import { type LoginSchema } from "@/utils/schemas/LoginSchemas"
import { ProfileEditSchema } from "@/utils/schemas/ProfileEditSchema"
import { type RegisterSchema } from "@/utils/schemas/RegisterSchema"
import { AuthApiError } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { createHash } from 'crypto'

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

export async function profileUpdatePassword(password: string) {
  const supabase = await createServerSideClient()
  const { data, error } = await supabase.auth.updateUser({
    password
  })

  return { data, error }
}

export async function getUserProfile() {
  const supabase = await createServerSideClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  if(error) return { user: null, error: 'AUTH_INVALID' } 
  
  const userProfile = await prisma.profile.findUnique({
    where: {
      id: user!.id
    },
    omit: {
      id: true
    }
  })

  if(!userProfile) return { user: userProfile, error: 'USER_INVALID' }
  return { user: userProfile, error: null }
}

export async function updateUserProfile(data: ProfileEditSchema) {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user) return {
    username: '',
    name: null,
    bio: null
  }
  return await prisma.profile.update({
    where: {
      id: user.id
    },
    omit: {
      picture: true,
      id: true
    },
    data: {
      username: data.username,
      name: data.name,
      bio: data.bio? data.bio : null,
    }
  })
}

export async function updateUserProfilePicture(file: File) {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()

  if(!user) return {
    username: '',
    name: null,
    bio: null,
    picture: null, 
  }

  const uniqueId = createHash('sha256').update(user.id).digest('hex')
  const { data, error } = await supabase.storage.from('avatar').upload(`avatar-${uniqueId}.png`, file, {
    upsert: true,
    cacheControl: '3600',
  })
  
  if(error) return {
    username: '',
    name: null,
    bio: null,
    picture: null, 
  }

  const { data: { publicUrl } } = supabase.storage.from('avatar').getPublicUrl(data.path)

   return await prisma.profile.update({
    where: {
      id: user.id
    },
    omit:{
      id: true
    },
    data: {
      picture: `${publicUrl+`?v=${Date.now()}`}`
    }
  })
}

export async function deleteUserProfilePicture() {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()
  const uniqueId = createHash('sha256').update(user!.id).digest('hex')
  if(!user) return {
    username: '',
    name: null,
    bio: null,
    picture: null, 
  }

  const { error } = await supabase.storage.from('avatar').remove([`avatar-${uniqueId}.png`])

  if(error) return {
    username: '',
    name: null,
    bio: null,
    picture: null, 
  }

  return await prisma.profile.update({
    where: {
      id: user.id
    },
    omit:{
      id: true
    },
    data: {
      picture: null
    }
  })
}