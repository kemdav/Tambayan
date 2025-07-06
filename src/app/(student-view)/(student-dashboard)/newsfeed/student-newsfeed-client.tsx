// app/.../newsfeed/student-newsfeed-client.tsx
"use client";

import { useState } from "react";
import { myButtons } from "./navBarContents";
import StudentNewsfeedCard from "@/app/components/ui/student-view-ui/student-newsfeed-card";
import { Poster } from "@/lib/types/types";

interface StudentNewsfeedClientProps {
    initialOfficialPosts: Poster[];
    initialCommunityPosts: Poster[];
}

export default function StudentNewsfeedClient({
    initialOfficialPosts,
    initialCommunityPosts
}: StudentNewsfeedClientProps) {
    const [selectedNavId, setSelectedNavId] = useState<string>("officialPost");

    return (
        <main className="w-full grid place-items-center items-start mt-10 md:mt-0">
            <div className="mainContentCard">
                <StudentNewsfeedCard
                    className="h-1/2"
                    myButtons={myButtons}
                    selectedButtonId={selectedNavId}
                    onButtonSelect={setSelectedNavId}
                    // Pass the fetched posts down
                    officialPosts={initialOfficialPosts}
                    communityPosts={initialCommunityPosts}
                />
            </div>
        </main>
    );
}