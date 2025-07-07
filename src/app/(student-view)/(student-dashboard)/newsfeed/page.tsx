// app/.../newsfeed/page.tsx
// REMOVE "use client";

import { getNewsfeedPosts } from '@/lib/actions/newsfeed'; // Import the new action
import StudentNewsfeedClient from './student-newsfeed-client'; // We will create this new client component
import { getUpcomingEvents, getRegisteredEvents } from "@/lib/actions/events";

export default async function NewsfeedPage() {
    const [
        officialPosts,
        communityPosts,
        upcomingEvents,
        registeredEvents,
    ] = await Promise.all([
        getNewsfeedPosts(true),
        getNewsfeedPosts(false),
        getUpcomingEvents(),
        getRegisteredEvents(),
    ]);

    return (
        <StudentNewsfeedClient
            initialOfficialPosts={officialPosts || []}
            initialCommunityPosts={communityPosts || []}
            initialUpcomingEvents={upcomingEvents || []}
            initialRegisteredEvents={registeredEvents || []} // <-- Add fallback here
        />
    );
}