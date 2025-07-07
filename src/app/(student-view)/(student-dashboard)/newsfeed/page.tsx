// app/.../newsfeed/page.tsx
// REMOVE "use client";

import { getNewsfeedPosts } from '@/lib/actions/newsfeed'; // Import the new action
import StudentNewsfeedClient from './student-newsfeed-client'; // We will create this new client component

// This is now a Server Component
export default async function NewsfeedPage() {
    // Fetch both official and community posts on the server
    const officialPosts = await getNewsfeedPosts(true);
    const communityPosts = await getNewsfeedPosts(false);

    // Pass the fetched data down to a client component for interactivity
    return (
        <StudentNewsfeedClient
            initialOfficialPosts={officialPosts}
            initialCommunityPosts={communityPosts}
        />
    );
}