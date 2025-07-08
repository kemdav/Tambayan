// lib/actions/accreditation.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Action to get the current accreditation status for an org
export async function getAccreditationStatus(orgId: string, academicYear: string) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('accreditations')
        .select('*')
        .eq('orgid', orgId)
        .eq('academic_year', academicYear)
        .maybeSingle(); // Use maybeSingle as there might not be an entry yet

    if (error) {
        console.error("Error fetching accreditation status:", error.message);
        return null;
    }
    return data;
}

// Action for the President to submit their file
export async function submitAccreditationFile(orgId: string, academicYear: string, formData: FormData) {
    const supabase = await createClient();
    const file = formData.get('accreditationPdf') as File;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.error("No user is logged in. Can't upload file.");
        return { error: "You must be logged in to upload files." };
    }
    if (!file) {
        return { error: 'No file provided.' };
    }

    // Step 1: Upload the file to Storage (this part is likely fine)
    const filePath = `${orgId}/${academicYear}-${file.name}`;
    const { error: uploadError } = await supabase.storage
        .from('accreditation-files')
        .upload(filePath, file, { upsert: true });

    if (uploadError) {
        console.error("Upload error:", uploadError);
        return { error: `Failed to upload file: ${uploadError.message}` }; // Return the actual error
    }

    // Step 2: Check if an accreditation record already exists
    const { data: existingRecord, error: selectError } = await supabase
        .from('accreditations')
        .select('id')
        .eq('orgid', orgId)
        .eq('academic_year', academicYear)
        .maybeSingle();

    if (selectError) {
        console.error("Error checking for existing record:", selectError);
        return { error: 'Could not verify accreditation status.' };
    }

    let dbError = null;

    if (existingRecord) {
        // --- Step 3a: UPDATE the existing record ---
        console.log("Found existing record. Updating...");
        const { error } = await supabase
            .from('accreditations')
            .update({
                submission_status: 'Pending Review',
                file_path: filePath
            })
            .eq('id', existingRecord.id); // Update by primary key
        dbError = error;

    } else {
        // --- Step 3b: INSERT a new record ---
        console.log("No existing record found. Inserting...");
        // You'll need to fetch the universityid for a new record
        const { data: orgData } = await supabase.from('organizations').select('universityid').eq('orgid', orgId).single();
        if (!orgData?.universityid) {
            return { error: 'Could not find university for this organization.' };
        }

        const { error } = await supabase
            .from('accreditations')
            .insert({
                orgid: orgId,
                universityid: orgData.universityid,
                academic_year: academicYear,
                submission_status: 'Pending Review',
                file_path: filePath
            });
        dbError = error;
    }

    if (dbError) {
        console.error("Database operation failed:", dbError);
        // CRITICAL: Log the specific error to see if it's INSERT or UPDATE failing
        console.error(`Operation that failed: ${existingRecord ? 'UPDATE' : 'INSERT'}`);
        return { error: `Failed to update database: ${dbError.message}` };
    }

    revalidatePath(`/organization/${orgId}/manage/accreditation`);
    return { success: true, filePath: filePath };
}

// Types for admin accreditation page
export type AccreditationStatus = "Pending" | "Approved" | "Revision" | "Rejected";

export type AccreditationData = {
  orgid: string;
  orgname: string | null;
  created: string | null;
  university: {
    uname: string | null;
  } | null;
  status: AccreditationStatus;
  file_path: string | null;
};

// Get accreditation statistics for admin dashboard
export async function getAccreditationStats() {
  const supabase = await createClient();
  const universityid = await getCurrentAdminUniversityId();
  if (!universityid) {
    return {
      pending_count: 0,
      approved_count: 0,
      revision_count: 0,
      rejected_count: 0,
    };
  }
  // Count by status, filtered by universityid
  const statuses = ["Pending", "Approved", "Revision", "Rejected"];
  const counts: Record<string, number> = {};
  for (const status of statuses) {
    const { count } = await supabase
      .from("accreditations")
      .select("id", { count: "exact", head: true })
      .eq("submission_status", status)
      .eq("universityid", universityid);
    counts[status] = count || 0;
  }
  return {
    pending_count: counts["Pending"],
    approved_count: counts["Approved"],
    revision_count: counts["Revision"],
    rejected_count: counts["Rejected"],
  };
}

// Helper to get the current admin's universityid
const getCurrentAdminUniversityId = async (): Promise<string | null> => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.email) return null;
  const { data: universityProfile } = await supabase
    .from("university")
    .select("universityid")
    .eq("universityemail", user.email)
    .single();
  return universityProfile?.universityid || null;
};

// Get organizations by accreditation status for admin view
export async function getOrganizationsByStatus(status: AccreditationStatus): Promise<AccreditationData[]> {
  const supabase = await createClient();
  // Join accreditations with organizations and university
  const universityid = await getCurrentAdminUniversityId();
  if (!universityid) return [];
  const { data, error } = await supabase
    .from("accreditations")
    .select(`orgid, created_at, submission_status, organizations:orgid (orgname, universityid, created, university:universityid (uname)), file_path`)
    .eq("submission_status", status)
    .eq("universityid", universityid)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching organizations by status:", error.message);
    return [];
  }
  // Map to AccreditationData
  return (data || []).map((row: any) => ({
    orgid: row.orgid,
    orgname: row.organizations?.orgname || null,
    created: row.organizations?.created || null,
    university: row.organizations?.university || null,
    status: row.submission_status,
    file_path: row.file_path || null,
  }));
}

// Update an organization's accreditation status (admin action)
export async function updateOrganizationAccreditationStatus(
  orgid: string,
  newStatus: AccreditationStatus,
  reviewerNotes?: string
) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("accreditations")
    .update({
      submission_status: newStatus,
      reviewer_notes: reviewerNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("orgid", orgid);
  if (error) {
    console.error("Error updating accreditation status:", error.message);
    return { success: false, error: error.message };
  }
  revalidatePath(`/admin/accreditation`);
  return { success: true };
}
