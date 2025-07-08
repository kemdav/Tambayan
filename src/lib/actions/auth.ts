// In /lib/actions/auth.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();

  // This function invalidates the user's session cookie
  await supabase.auth.signOut();

  // Redirect the user to the login page after signing out
  return redirect("/login");
}