// app/search-posts/SearchPostsClient.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import type { Poster } from "@/lib/types/types";
import { Input } from "@/app/components/ui/general/input/input";
import { DisplayPostComponent } from "@/app/components/ui/general/display-post-component";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useSearchParams } from 'next/navigation';

interface SearchPostsClientProps {
    initialPosts: Poster[];
}

export default function SearchPostsClient({ initialPosts }: SearchPostsClientProps) {

    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const searchParams = useSearchParams(); // Hook to read URL query params
    const initialQuery = searchParams.get('q') || ''; // Get the 'q' parameter, default to empty string
    const [searchTerm, setSearchTerm] = useState(initialQuery);

    // Get the current user to pass to DisplayPostComponent for like/edit status
    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setCurrentUser(user);
            }
        });
    }, []);

    // useMemo will re-calculate the filtered list ONLY when searchTerm or initialPosts changes.
    // This is very efficient.
    const filteredPosts = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        if (!lowercasedTerm) return [];
        return initialPosts.filter(post => {
            const titleMatch = post.title?.toLowerCase().includes(lowercasedTerm);
            const contentMatch = post.content.toLowerCase().includes(lowercasedTerm);
            const posterMatch = post.posterName.toLowerCase().includes(lowercasedTerm);
            const orgMatch = post.recipient?.toLowerCase().includes(lowercasedTerm);

            return titleMatch || contentMatch || posterMatch || orgMatch;
        });
    }, [searchTerm, initialPosts]);

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Search Posts</h1>

            <div className="relative mb-8">
                <Input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by title, content, author, or organization..."
                    className="w-full p-3 text-lg border-2 rounded-lg"
                />
            </div>

            <div className="space-y-4">
                {searchTerm && filteredPosts.length === 0 && (
                    <p className="text-center text-gray-500">No posts found for "{searchTerm}".</p>
                )}

                {filteredPosts.map((post) => (
                    <DisplayPostComponent
                        key={post.postID}
                        {...post} // Spread all the post props
                        currentUserID={currentUser?.id}
                    />
                ))}
            </div>
        </div>
    );
}