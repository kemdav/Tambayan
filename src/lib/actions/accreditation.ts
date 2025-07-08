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
                file_path: filePath,
                submitted_at: new Date().toISOString()
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
                file_path: filePath,
                submitted_at: new Date().toISOString()
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
