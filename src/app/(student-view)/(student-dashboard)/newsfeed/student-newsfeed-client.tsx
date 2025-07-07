// app/.../newsfeed/student-newsfeed-client.tsx
"use client";

import { useState } from "react";
import { myButtons } from "./navBarContents";
import StudentNewsfeedCard from "@/app/components/ui/student-view-ui/student-newsfeed-card";
import { Poster } from "@/lib/types/types";
import { Tables } from "@/lib/database.types";

interface StudentNewsfeedClientProps {
    initialOfficialPosts?: Poster[];
    initialCommunityPosts?: Poster[];
    initialUpcomingEvents?: EventWithOrg[];
    initialRegisteredEvents?: EventWithOrg[];
}

type EventWithOrg = Tables<'events'> & {
    organizations: Pick<Tables<'organizations'>, 'orgname' | 'picture'> | null;
};

export default function StudentNewsfeedClient({
    initialOfficialPosts = [], // Add default
    initialCommunityPosts = [], // Add default
    initialUpcomingEvents = [], // Add default
    initialRegisteredEvents = [] // Add default
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
                    officialPosts={initialOfficialPosts}
                    communityPosts={initialCommunityPosts}
                    upcomingEvents={initialUpcomingEvents} // <-- Pass props down
                    registeredEvents={initialRegisteredEvents} // <-- Pass props down
                />
            </div>
        </main>
    );
}