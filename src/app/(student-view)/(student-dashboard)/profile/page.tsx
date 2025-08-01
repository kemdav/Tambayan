//profile page.tsx

import { createClient } from "@/lib/supabase/server"; // Your server client creator
import { redirect } from "next/navigation";
import { type StudentProfile } from "@/lib/types/database"; // Assuming StudentProfile is Tables<'student'>
import { getPostsByStudent } from "@/lib/actions/post";     // Import your server action for posts
import type { Poster } from "@/lib/types/types";           // Ensure Poster type is imported
import ProfileView from "@/app/components/ui/student-view-ui/ProfileView"; 
import { getCommentsByStudent } from "@/lib/actions/comment"; 
import { StudentComment } from "@/lib/actions/comment";

export default async function ProfilePage() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: initialProfile, error: profileError } = await supabase
    .from("student")
    .select<string, StudentProfile>("*") // Use your type for safety
    .eq("user_id", user.id) // Filter by the authenticated user's ID
    .single(); 

   //console.log("Profile query result:", { profile, error });

  if (profileError || !initialProfile) {
    console.error("Error fetching profile:", profileError?.message);
    // If no profile found for the user, redirect them to a profile creation page
    redirect("/register");
  }
  

  const [initialPosts, initialComments, { data: studentStats }] = await Promise.all([
    getPostsByStudent(initialProfile.studentid),
    getCommentsByStudent(initialProfile.studentid),
    // Call the new RPC function
    supabase.rpc('get_student_stats', { p_student_id: initialProfile.studentid }).single()
  ]);
  console.log("ProfilePage (Server): Value of initialPosts after fetching:", initialPosts);
  console.log("ProfilePage (Server): user.id (currentUserID source) =", user.id);
console.log("ProfilePage (Server): initialComments =", initialComments);
  

  // 3. Render the CLIENT component and pass the fetched data as a prop
  return (
    <ProfileView
      initialProfile={initialProfile}
      initialPosts={initialPosts}
      currentUserID={user.id}
      isOwnProfile={true}
      initialComments={initialComments} // Pass comments if fetched
      studentStats={studentStats}
    />
  );
}