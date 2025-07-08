// lib/actions/broadcast.ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function getBroadcastsFor(context: 'student' | 'organization') {
    const supabase = await createClient();

    // Get the current user to find their university
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: student } = await supabase
        .from('student')
        .select('universityid')
        .eq('user_id', user.id)
        .single();

    if (!student || !student.universityid) {
        console.error("Could not find student's university to fetch broadcasts.");
        return [];
    }
    
    // Determine which recipients to fetch based on the context
    const targetRecipients = context === 'student'
        ? ['all', 'students']
        : ['all', 'organizations'];
    
    // Fetch all broadcasts for that university targeting the correct recipients
    const { data: broadcasts, error } = await supabase
        .from('broadcast')
        .select('*')
        .eq('universityid', student.universityid)
        .in('recipient', targetRecipients) // Use .in() to match multiple values
        .order('date', { ascending: false }); // Newest first

    if (error) {
        console.error(`Error fetching broadcasts for context '${context}':`, error.message);
        return [];
    }

    return broadcasts || [];
}