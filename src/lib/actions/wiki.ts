// src/lib/actions/wiki.ts
"use server";

import { createClient } from "@/lib/supabase/server";

// Define the type for a wiki section for type safety
export interface WikiSection {
  id: string;
  title: string;
}

// We'll use this in the list page
export async function getWikiSections(orgId: string): Promise<WikiSection[]> {
    const supabase = await createClient();

    // In the future, you'll query your 'wiki' table here
    // For example:
    /*
    const { data, error } = await supabase
        .from('wiki')
        .select('wikiid, section')
        .eq('orgid', orgId);

    if (error) {
        console.error("Error fetching wiki sections:", error);
        return [];
    }

    // Format the data to match the WikiSection type
    return data.map(item => ({ id: item.wikiid.toString(), title: item.section || 'Untitled' }));
    */

    // For now, return dummy data so the page works
    console.log(`[getWikiSections] Faking data for orgId: ${orgId}`);
    return [
        { id: "1", title: "Introduction" },
        { id: "2", title: "How to Join" },
        { id: "3", title: "Settings & Tools" },
    ];
}