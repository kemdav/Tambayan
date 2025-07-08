// lib/supabase/queries/fetchOrganizations.ts
import { createClient } from "@/lib/supabase/client";

export async function fetchOrganizations(universityId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("organizations")
    .select("orgid, orgname, school, category, picture, cover_photo_path")
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
