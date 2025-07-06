// lib/actions/organization.ts
"use server";
import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/database.types"; // Assuming Tables<'organizations'> will exist after type generation

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