// src/lib/actions/wiki.ts
"use server";


import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
export interface WikiSection {
  id: string;
  title: string;
}
type WikiPageResult = {
    wikiid: number;
    section: string | null;
    content: string | null;
    orgid: string | null; // <-- Explicitly allow null here
} | null; 

// We'll use this in the list page
export async function getWikiSections(orgId: string): Promise<WikiSection[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('wiki')
        .select('wikiid, section') // 'section' is used as the title here
        .eq('orgid', orgId)
        .order('position', { ascending: true }); // Order by position

    if (error) {
        console.error("Error fetching wiki sections:", error.message);
        return [];
    }
    // Format to match what the client expects
    return data.map(item => ({ id: item.wikiid.toString(), title: item.section || 'Untitled' }));
}

export async function getWikiPage(wikiId: number): Promise<WikiPageResult> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('wiki')
        .select('wikiid, section, content, orgid')
        .eq('wikiid', wikiId)
        .single();

    if (error) {
        console.error("Error fetching wiki page:", error.message);
        return null;
    }
    return data;
}

export async function createWikiSection(orgId: string, title: string, content: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('wiki')
        .insert({
            orgid: orgId,
            section: title,
            content: content,
            // You might want logic to determine the next position
        });

    if (error) {
        console.error("Error creating wiki section:", error);
        return { error: "Failed to create section." };
    }

    // Revalidate the wiki list page to show the new section
    revalidatePath(`/organization/${orgId}/wiki`);
    return { success: true };
}

export async function updateWikiPage(wikiId: number, title: string, content: string, orgId: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('wiki')
        .update({
            section: title,
            content: content,
            lastupdated: new Date().toISOString()
        })
        .eq('wikiid', wikiId);
    
    if (error) {
        console.error("Error updating wiki page:", error);
        return { error: "Failed to update page." };
    }

    // Revalidate the specific wiki page and the list page
    revalidatePath(`/organization/${orgId}/wiki`);
    revalidatePath(`/organization/${orgId}/wiki/${wikiId}`);
    return { success: true };
}


export async function deleteWikiSection(wikiId: number, orgId: string) {
    const supabase = await createClient();

    // Note: RLS should be in place to ensure only authorized users can delete.
    const { error } = await supabase
        .from('wiki')
        .delete()
        .eq('wikiid', wikiId);

    if (error) {
        console.error("Error deleting wiki section:", error);
        return { error: "Failed to delete section." };
    }

    // Revalidate the main wiki page to reflect the deletion
    revalidatePath(`/organization/${orgId}/wiki`);
    return { success: true };
}