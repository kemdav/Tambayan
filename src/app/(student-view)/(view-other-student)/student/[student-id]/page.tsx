// app/student/[student-id]/page.tsx
"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { type StudentProfile } from "@/lib/types/database";
import { getPostsByStudent } from "@/lib/actions/post";
import { getCommentsByStudent } from "@/lib/actions/comment";
import ProfileView from "@/app/components/ui/student-view-ui/ProfileView";

interface PageProps {
  params: { 'student-id': string };
}

export default async function ViewStudentProfilePage({ params }: PageProps) {
  const studentIdToView = Number(params['student-id']);
  const supabase = await createClient();

  // 1. Get the currently logged-in user to see if we are viewing our own profile
  const { data: { user } } = await supabase.auth.getUser();

  if (isNaN(studentIdToView)) {
    // Handle invalid student ID in URL
    return <div>Invalid student ID.</div>;
  }
  
  // 2. Fetch the profile of the student whose ID is in the URL
  const { data: profileToView, error: profileError } = await supabase
    .from("student")
    .select<string, StudentProfile>("*")
    .eq("studentid", studentIdToView)
    .single();

  if (profileError || !profileToView) {
    // Handle case where the student doesn't exist
    return <div>Student profile not found.</div>;
  }

  // 3. Determine if the viewer is looking at their own profile
  //    This is true if there is a logged-in user AND their user_id matches the viewed profile's user_id
  const isOwnProfile = user?.id === profileToView.user_id;

  // 4. Fetch the posts and comments for the viewed profile
  const [posts, comments, { data: studentStats }] = await Promise.all([
    getPostsByStudent(profileToView.studentid),
    getCommentsByStudent(profileToView.studentid),
    supabase.rpc('get_student_stats', { p_studentid: profileToView.studentid }).single()
  ]);

  // 5. Render the SAME ProfileView component, but pass the correct props
  return (
    <ProfileView
      initialProfile={profileToView}
      initialPosts={posts}
      initialComments={comments}
      currentUserID={user?.id ?? ''} // Pass the current user's ID for "like" status etc.
      isOwnProfile={isOwnProfile} // <-- The new, crucial prop!
      studentStats={studentStats}
    />
  );
}