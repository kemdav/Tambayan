"use server";

import { createClient } from "@/lib/supabase/server"; // adjust path if needed

export async function getTeacherProfile(teacherId: number) {
  const supabase = await createClient(); // ✅ MUST await

  const { data, error } = await supabase
    .from("staff")
    .select("*")
    .eq("teacherid", teacherId)
    .single();

  if (error) {
    console.error("Fetch error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function updateTeacherProfile(
  teacherId: number,
  payload: {
    fullname: string;
    email: string;
    position: string;
    department: string;
    profile: string;
  }
) {
  const supabase = await createClient(); // ✅ MUST await

  const { error } = await supabase
    .from("staff")
    .update(payload)
    .eq("teacherid", teacherId);

  if (error) {
    console.error("Update error:", error.message);
    throw new Error(error.message);
  }

  return true;
}
