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

export async function addMember(orgId: string, studentId: number) {
    const supabase = await createClient();

    // RLS will enforce that only authorized users (e.g., President) can add.
    // It also needs to ensure the student is from the same university.

    // Default new members to 'Member' position
    const defaultPosition = 'Member'; 

    const { error } = await supabase
        .from('orgmember')
        .insert({
            orgid: orgId,
            studentid: studentId,
            position: defaultPosition
        });

    if (error) {
        console.error("Error adding member:", error);
        // Handle specific error codes if needed, e.g., unique violation if already a member
        if (error.code === '23505') { // Unique violation code
            return { error: "This student is already a member of this organization." };
        }
        return { error: `Failed to add member: ${error.message}` };
    }

    revalidatePath(`/organization/${orgId}/manage/officers`); // Revalidate to update the list
    return { success: `Student added as '${defaultPosition}'.` };
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
