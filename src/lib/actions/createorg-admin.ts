import { createClient } from "@/lib/supabase/client";

// Helper to get the current admin's universityid
export const getCurrentAdminUniversityId = async (): Promise<string | null> => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  const { data: universityProfile } = await supabase
    .from("university")
    .select("universityid")
    .eq("universityemail", user.email)
    .single();
  return universityProfile?.universityid || null;
};

// Generate a unique orgid from orgname (e.g., slugify and add random suffix)
function generateOrgId(orgname: string): string {
  const slug = orgname
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  const rand = Math.random().toString(36).substring(2, 7);
  return `${slug}-${rand}`;
}

// Create a new organization in the organizations table and assign president
export async function createOrganization(orgname: string, assignedStudentId: string | null) {
  const supabase = createClient();
  const universityid = await getCurrentAdminUniversityId();
  if (!universityid) return { error: "No universityid found for current admin." };
  if (!orgname.trim()) return { error: "Organization name is required." };
  if (!assignedStudentId) return { error: "You must assign a president." };
  const orgid = generateOrgId(orgname);
  const { error: orgError } = await supabase
    .from("organizations")
    .insert({ orgid, orgname, universityid });
  if (orgError) return { error: orgError.message };
  // Insert into orgmember: orgid, studentid, position: 'president'
  const { error: memberError } = await supabase
    .from("orgmember")
    .insert({ orgid, studentid: assignedStudentId, position: "President" });
  if (memberError) return { error: memberError.message };
  return { success: true, orgid };
}

// Fetch all students with matching universityid for Assign as President
export async function fetchStudentsForPresident() {
  const supabase = createClient();
  const universityid = await getCurrentAdminUniversityId();
  if (!universityid) return [];
  const { data, error } = await supabase
    .from("student")
    .select("fname, lname, course, yearlevel, studentid")
    .eq("universityid", universityid);
  if (error || !data) return [];
  return data.map((s: any) => ({
    firstname: s.fname,
    lastname: s.lname,
    course: s.course,
    yearlvl: s.yearlevel,
    studentid: String(s.studentid),
  }));
} 