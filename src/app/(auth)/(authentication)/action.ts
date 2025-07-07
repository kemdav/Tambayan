//action.ts
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    // It's better to redirect to a page that can display the error
    // For now, redirecting to /login with an error message is a good pattern
    redirect('/login?message=Could not authenticate user')
  }

  revalidatePath('/', 'layout')
  redirect('/newsfeed')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  // --- MODIFICATION START ---
  // Get all the additional metadata from the FormData object
  const fname = formData.get('fname') as string
  const lname = formData.get('lname') as string
  const mname = formData.get('mname') as string
  const universityid = formData.get('universityid') as string
  const course = formData.get('course') as string
  const yearlevel = formData.get('yearlevel') as string

  // Now, use the metadata in the `signUp` call
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fname,
        lname,
        mname,
        universityid,
        course,
        yearlevel,
      },
    },
  })
  // --- MODIFICATION END ---

  if (error) {
    // Redirect with an error message so the UI can display it
    redirect('/register?message=Could not create user. Please try again.')
  }

  // Redirect to a page that tells the user to check their email
  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}