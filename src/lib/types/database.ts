export type StudentProfile = {
  studentid: number;
  fname: string | null;
  lname: string | null;
  email: string | null;
  picture: string | null; // Assuming picture is a URL from Supabase Storage
  universityid: string | null;
  course: string | null;
  yearlevel: string | null;
  about: string | null;
  user_id: string; // The crucial link to auth.users
  cover_photo: string | null;
};