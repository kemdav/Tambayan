// app/.../newsfeed/student-newsfeed-client.tsx
"use client";

import { useState, useMemo } from "react";
import { myButtons } from "./navBarContents";
import StudentNewsfeedCard from "@/app/components/ui/student-view-ui/student-newsfeed-card";
import { Poster } from "@/lib/types/types";
import { Tables } from "@/lib/database.types";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { useRouter } from "next/navigation";


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
    const [filterOrgId, setFilterOrgId] = useState<string | null>(null);

     const orgFilterOptions = useMemo(() => {
        const orgs = new Map<string, string>();
        
        // Gather all unique organizations from all content types
        initialOfficialPosts.forEach(p => p.recipient && orgs.set(p.recipient, p.recipient));
        initialCommunityPosts.forEach(p => p.recipient && orgs.set(p.recipient, p.recipient));
        initialUpcomingEvents.forEach(e => e.organizations?.orgname && orgs.set(e.organizations.orgname, e.organizations.orgname));
        
        // Format for the dropdown component
        const options = Array.from(orgs.keys()).map(orgName => ({
            value: orgName,
            label: orgName
        }));

        // Add the "All" option to the beginning
        return [{ value: 'all', label: 'All Subscribed Orgs' }, ...options];
    }, [initialOfficialPosts, initialCommunityPosts, initialUpcomingEvents]);

    const filteredOfficialPosts = filterOrgId 
        ? initialOfficialPosts.filter(p => p.recipient === filterOrgId) 
        : initialOfficialPosts;
    
    const filteredCommunityPosts = filterOrgId 
        ? initialCommunityPosts.filter(p => p.recipient === filterOrgId) 
        : initialCommunityPosts;

    const filteredUpcomingEvents = filterOrgId 
        ? initialUpcomingEvents.filter(e => e.organizations?.orgname === filterOrgId) 
        : initialUpcomingEvents;

    return (
        <main className="w-full grid place-items-center items-start mt-10 md:mt-0">
            <div className="p-4 border-b flex items-center gap-4">
                    <h2 className="font-semibold text-lg">Filter by Organization:</h2>
                    <DropdownRole
                        options={orgFilterOptions}
                        placeholder="All Subscribed Orgs"
                        width="w-64"
                        onSelect={(value) => setFilterOrgId(value === 'all' ? null : value)}
                    />
                </div>
            <div className="mainContentCard">
                <StudentNewsfeedCard
                    className="h-1/2"
                    myButtons={myButtons}
                    selectedButtonId={selectedNavId}
                    onButtonSelect={setSelectedNavId}
                    officialPosts={filteredOfficialPosts}
                    communityPosts={filteredCommunityPosts}
                    upcomingEvents={filteredUpcomingEvents}
                    registeredEvents={initialRegisteredEvents}
                />
            </div>
        </main>
    );
}