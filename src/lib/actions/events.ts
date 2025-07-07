// lib/actions/events.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Helper function to get the current student's ID
async function getCurrentStudentId() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: student } = await supabase
        .from('student')
        .select('studentid')
        .eq('user_id', user.id)
        .single();

    return student?.studentid ?? null;
}

// Action to get UPCOMING events from all subscribed organizations
export async function getUpcomingEvents() {
    console.log("--- [getUpcomingEvents] ACTION STARTED ---");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("[getUpcomingEvents] No logged-in user found.");
        return [];
    }

    const { data: student } = await supabase
        .from('student')
        .select('studentid, universityid')
        .eq('user_id', user.id)
        .single();

    if (!student || !student.universityid) {
        console.log("[getUpcomingEvents] No student profile or universityId found for the user.");
        return [];
    }

    // --- THIS IS THE FIX ---
    // Pass student.studentid (a number) instead of the whole student object.
    const { data: subscriptions, error: subError } = await supabase
        .from('subscribedorg')
        .select('orgid')
        .eq('studentid', student.studentid); 
    // --- END FIX ---


    if (subError) {
        console.error("[getUpcomingEvents] Error fetching subscriptions:", subError.message);
        return [];
    }

    if (!subscriptions || subscriptions.length === 0) {
        console.log("[getUpcomingEvents] User has no subscriptions.");
        return [];
    }
    const subscribedOrgIds = subscriptions.map(s => s.orgid);

    const { data: events, error } = await supabase
        .from('events')
        .select(`*, organizations (orgname, picture)`)
        .eq('universityid', student.universityid)
        .in('orgid', subscribedOrgIds)
        .gt('date', new Date().toISOString())
        .order('date', { ascending: true });

    if (error) {
        console.error("Error fetching upcoming events:", error.message);
    }
    console.log(`[getUpcomingEvents] Found ${events?.length || 0} upcoming events.`, events);
    console.log("--- [getUpcomingEvents] ACTION FINISHED ---");
    
    return events || [];
}
export async function getOrgUpcomingEvents(orgId: string) {
    console.log(`--- [getOrgUpcomingEvents] ACTION STARTED for orgId: ${orgId} ---`);
    const supabase = await createClient();

    const { data: events, error } = await supabase
        .from('events')
        .select(`
            *,
            organizations (orgname, picture)
        `)
        .eq('orgid', orgId)
        .gt('date', new Date().toISOString()) // Filter for events in the future
        .order('date', { ascending: true });

    if (error) {
        console.error(`Error fetching upcoming events for org ${orgId}:`, error.message);
        return [];
    }
    console.log(`[getOrgUpcomingEvents] Found ${events?.length || 0} events for orgId: ${orgId}`, events);
    console.log(`--- [getOrgUpcomingEvents] ACTION FINISHED ---`);
    return events || [];
}

export async function deleteEvent(eventId: number, orgId: string) {
    const supabase = await createClient();

    // RLS policies will enforce security here.
    // The query will fail if the user doesn't have permission.
    const { error } = await supabase
        .from('events')
        .delete()
        .eq('eventid', eventId);

    if (error) {
        console.error("Error deleting event:", error);
        return { error: "Failed to delete event. You may not have permission." };
    }

    // Revalidate the organization's newsfeed page to show the event is gone.
    revalidatePath(`/organization/${orgId}/newsfeed`);
    return { success: true };
}

// Action to get events the current user is REGISTERED for
export async function getRegisteredEvents() {
    const supabase = await createClient();
    const studentId = await getCurrentStudentId();
    if (!studentId) return [];

    const { data, error } = await supabase
        .from('eventregistrations') // <-- USING THE CORRECT TABLE
        .select(`events (*, organizations (orgname, picture))`)
        .eq('studentid', studentId)
        .order('created_at', { ascending: false });

    if (error) console.error("Error fetching registered events:", error.message);

    // The result is nested, so extract the event data
    return data?.map(item => item.events).filter(Boolean) ?? [];
}

// Action to REGISTER or UNREGISTER for an event
export async function toggleEventRegistration(eventId: number, isRegistered: boolean) {
    const supabase = await createClient();
    const studentId = await getCurrentStudentId();
    if (!studentId) return { error: "You must be logged in to register." };

    if (isRegistered) {
        // UNREGISTER: Delete from the registrations table
        const { error } = await supabase
            .from('eventregistrations') // <-- USING THE CORRECT TABLE
            .delete()
            .match({ eventid: eventId, studentid: studentId });
        if (error) return { error: "Could not unregister from event." };
    } else {
        // REGISTER: Insert into the registrations table
        const { error } = await supabase
            .from('eventregistrations') // <-- USING THE CORRECT TABLE
            .insert({ eventid: eventId, studentid: studentId });
        if (error) return { error: "Could not register for event." };
    }

    revalidatePath('/newsfeed');
    return { success: true };
}