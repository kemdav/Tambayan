// lib/actions/permissions.ts
"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * Checks the current user's role in a specific organization.
 * @param orgId The ID of the organization to check.
 * @returns An object containing the user's position/role, or null if they are not a member.
 */
export async function getUserOrgRole(orgId: string): Promise<{ role: string | null }> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { role: null }; // Not logged in
    }

    // First, get the student ID for the current user
    const { data: student, error: studentError } = await supabase
        .from('student')
        .select('studentid')
        .eq('user_id', user.id)
        .single();
    
    if (studentError || !student) {
        return { role: null }; // No student profile found
    }

    // Now, check the orgmember table
    const { data: member, error: memberError } = await supabase
        .from('orgmember')
        .select('position')
        .eq('orgid', orgId)
        .eq('studentid', student.studentid)
        .single();
        
    if (memberError || !member) {
        return { role: null }; // Not a member of this org or an error occurred
    }

    // Return the user's position (e.g., 'PRO', 'President')
    return { role: member.position };
}