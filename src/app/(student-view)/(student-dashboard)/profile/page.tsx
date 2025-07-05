// app/your-route/page.tsx   <- This is the new Server Component

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type StudentProfile } from "@/lib/types/database";
import ProfileView from "@/app/components/ui/student-view-ui/ProfileView"; // We will create this next

export default async function ProfilePage() {
  // 1. Use the SERVER client to fetch data securely
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // console.log("Attempting to fetch profile for user ID:", user.id);
  // 2. Fetch the student's profile data
  const { data: profile, error } = await (await supabase)
    .from("student")
    .select<string, StudentProfile>("*") // Use your type for safety
    .eq("user_id", user.id)
    .single();

   //console.log("Profile query result:", { profile, error });

  if (error || !profile) {
    // Handle case where profile doesn't exist
    redirect("/create-profile");
  }

  // 3. Render the CLIENT component and pass the fetched data as a prop
  return <ProfileView initialProfile={profile} />;
}