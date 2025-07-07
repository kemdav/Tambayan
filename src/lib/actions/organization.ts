// lib/actions/organization.ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/database.types"; // Assuming Tables<'organizations'> will exist after type generation
import { revalidatePath } from "next/cache";

export async function getOrganizationProfile(orgId: string): Promise<Tables<'organizations'> | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('orgid', orgId)
        .single();

    if (error) {
        console.error("Error fetching organization profile:", error.message);
        return null;
    }
    return data;
}

export async function getOrganizationMembers(orgId: string) {
    const supabase = await createClient();
    
    const { data, error } = await supabase
        .from('orgmember')
        .select(`
            studentid,
            position,
            student (
                fname,
                mname,
                lname,
                picture
            )
        `)
        .eq('orgid', orgId);

    if (error) {
        console.error("Error fetching organization members:", error.message);
        return [];
    }
    return data;
}

// --- Action to update a member's role ---
export async function updateMemberRole(orgId: string, studentId: number, newRole: string) {
    const supabase = await createClient();
    
    // RLS will protect this action
    const { error } = await supabase
        .from('orgmember')
        .update({ position: newRole })
        .eq('orgid', orgId)
        .eq('studentid', studentId);

    if (error) {
        console.error("Error updating member role:", error);
        return { error: "Failed to update role." };
    }

    // Revalidate the officers page to show the change
    revalidatePath(`/organization/${orgId}/manage/officers`);
    return { success: true };
}


// --- Action to remove a member from an organization ---
export async function removeMember(orgId: string, studentId: number) {
    const supabase = await createClient();

    // RLS will protect this action
    const { error } = await supabase
        .from('orgmember')
        .delete()
        .eq('orgid', orgId)
        .eq('studentid', studentId);

    if (error) {
        console.error("Error removing member:", error);
        return { error: "Failed to remove member." };
    }

    revalidatePath(`/organization/${orgId}/manage/officers`);
    return { success: true };
}
