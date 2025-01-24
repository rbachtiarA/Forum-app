'use server'

import { cookies } from "next/headers"

export async function create(name:string, email:string) {
    
  const cookiesStore = await cookies()
  cookiesStore.set('name', name)
  cookiesStore.set('email', email, {  secure: true })
}

export async function createAnon(id: string) {
  const cookiesStore = await cookies()
  cookiesStore.set('genetic_id', id)
}

export async function checkAnon() {
  const cookiesStore = await cookies()
  const genetic_id = cookiesStore.get('genetic_id')
  return genetic_id?.value
}
export async function checkUser() {
  const cookiesStore = await cookies()
  const userName = await cookiesStore.get('name')
  const email = await cookiesStore.get('email')
  return { name: userName?.value || null, email: email?.value || null }
}

export async function deleteUser() {
  const cookiesStore = await cookies()
  cookiesStore.delete('name')
  cookiesStore.delete('email')
}