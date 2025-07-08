// app/search-posts/page.tsx
"use server"; // <-- Mark as a Server Component

import { getNewsfeedPosts } from "@/lib/actions/newsfeed";
import SearchPostsClient from "./SearchPostsClient";

// This server page pre-fetches ALL posts from the user's subscribed orgs.
// The actual filtering will happen instantly on the client.
export default async function SearchPostsPage() {
    
    // Fetch both official and community posts in parallel
    const [officialPosts, communityPosts] = await Promise.all([
        getNewsfeedPosts(true),  // isOfficial = true
        getNewsfeedPosts(false)  // isOfficial = false
    ]);

    // Combine them into a single list
    const allPosts = [...officialPosts, ...communityPosts];

    // We can pre-sort them by date here on the server
    allPosts.sort((a, b) => b.daysSincePosted - a.daysSincePosted);

    return (
        <SearchPostsClient initialPosts={allPosts} />
    );
}