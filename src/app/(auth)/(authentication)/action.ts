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
    // Return error message instead of redirecting
    // Map known Supabase error codes/messages to user-friendly messages
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'Incorrect email or password. Please try again.' };
    }
    if (error.message.includes('Email not confirmed')) {
      return { error: 'Your email is not confirmed. Please check your inbox for a confirmation email.' };
    }
    // Add more mappings as needed
    return { error: 'Login failed. Please try again.' };
  }

  // Get the logged-in user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user is a student
  const { data: student } = await supabase
    .from('student')
    .select('studentid')
    .eq('user_id', user.id)
    .single();

  revalidatePath('/', 'layout')

  if (student) {
    redirect('/newsfeed');
  } else {
    redirect('/admin/dashboard');
  }
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