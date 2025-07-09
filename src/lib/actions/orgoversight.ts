// lib/actions/orgoversight.ts
import { createClient } from "@/lib/supabase/client";

export async function getUniversityIdFromSession(): Promise<string | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    console.error("❌ Auth error, no user, or email missing:", userError);
    return null;
  }

  console.log("📧 Logged-in email:", user.email);

  const { data: university, error: universityError } = await supabase
    .from("university")
    .select("universityid")
    .eq("universityemail", user.email)
    .maybeSingle();

  if (universityError || !university) {
    console.error("❌ University lookup failed:", universityError);
    return null;
  }

  console.log("🏫 University ID fetched:", university.universityid);
  return university.universityid;
}

export async function fetchOrganizations(universityId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("orgid, orgname, category, picture, cover_photo_path")
    .eq("universityid", universityId);

  if (error) {
    console.error("❌ Failed to fetch organizations:", error.message);
    throw error;
  }

  console.log("📦 Organizations fetched for universityId =", universityId, data);
  return data;
}

export async function deleteOrganization(orgID: string) {
  const supabase = createClient();
  const { error } = await supabase.from("organizations").delete().eq("orgid", orgID);

  if (error) {
    console.error("❌ Delete failed:", error.message);
    throw error;
  }

  console.log("✅ Successfully deleted org with ID:", orgID);
}
