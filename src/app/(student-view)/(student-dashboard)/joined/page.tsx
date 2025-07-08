// app/joined/page.tsx
"use server";

import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";
import JoinedOrgComponent from "@/app/components/ui/general/joined-org-component"; // We will create this
import { ShowcaseCardProps } from "@/app/components/ui/general/showcase-card-component";
const DEFAULT_AVATAR_URL = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Org';
// Define the shape of the data we expect from our query
type OrganizationData = {
    orgid: string;
    orgname: string;
    position: string | null; // <-- The key difference: we get the user's position
    status: string;
    picture: string | null;
    cover_photo_path: string | null;
    orgmember: { count: number }[];
    events: { count: number }[];
};

type JoinedOrgData = {
    organizations: OrganizationData | null; // The join could fail, so it might be null
    position: string | null;
};

export default async function JoinedOrgsPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { redirect("/login"); }

    const { data: studentProfile, error: profileError } = await supabase
        .from("student").select("studentid").eq("user_id", user.id).single();

    if (profileError || !studentProfile) {
        return <div>Error: Student profile not found.</div>;
    }

    // --- THE KEY CHANGE IS HERE ---
    // Query the 'orgmember' table instead of 'subscribedorg'
    const { data: joinedOrgsData, error: orgsError } = await supabase
        .from("orgmember") // <-- QUERYING THE CORRECT TABLE
        .select(`
      organizations!inner (
        orgid, orgname, status, picture, cover_photo_path,
        orgmember(count), events(count)
      ),
      position 
    `)
        .eq("studentid", studentProfile.studentid)
        .returns<JoinedOrgData[]>();


    if (orgsError) {
        console.error("Error fetching joined orgs:", orgsError);
        return <div>Error fetching organization data.</div>;
    }



    // --- The transformation logic is very similar ---
    const transformedOrgs: ShowcaseCardProps[] = [];

    for (const item of joinedOrgsData || []) {
        // We need to handle the slightly different data shape from the query
        const org = item.organizations;
        const position = item.position; // Get the position from the top level

        if (!org) continue;

        const getFinalUrl = (pathOrUrl: string | null | undefined): string | undefined => {
            if (!pathOrUrl || pathOrUrl.trim() === '') {
                return undefined; // Return undefined if there's no path
            }
            // Check if it's already a full HTTP URL
            if (pathOrUrl.startsWith('http')) {
                return pathOrUrl; // It's already a full URL, use it directly
            }
            // Otherwise, it's a path, so build the Supabase URL
            return supabase.storage.from("organization-assets").getPublicUrl(pathOrUrl).data.publicUrl;
        };
        const avatarUrl = getFinalUrl(org.picture) || DEFAULT_AVATAR_URL; // Use default if the final URL is undefined
        const coverPhotoUrl = getFinalUrl(org.cover_photo_path);

        console.log(`Processing org: ${org.orgname}, Final avatarUrl: ${avatarUrl}`);

        const newOrgCard: ShowcaseCardProps = {
            orgID: org.orgid,
            title: org.orgname,
            // Use the user's position as the subtitle!
            subtitle: position || 'Member',
            memberCount: org.orgmember[0]?.count ?? 0,
            eventCount: org.events[0]?.count ?? 0,
            avatarUrl: avatarUrl,
            coverPhotoUrl: coverPhotoUrl,
            tagText: org.status,
            tagBgColor: org.status === 'active' ? 'bg-green-100' : 'bg-red-100',
            tagTextColor: org.status === 'active' ? 'text-green-800' : 'text-red-800',
            buttons: [
                { label: "View", bgColor: "bg-action-fresh-green", textColor: "text-black" },
                { label: "Leave", bgColor: "bg-red-500", textColor: "text-white" },
            ],
        };

        transformedOrgs.push(newOrgCard);
    }

    return (
        <div className="w-full grid place-items-center items-start">
            <div className="mainContentCard">
                <JoinedOrgComponent initialOrgs={transformedOrgs} />
            </div>
        </div>
    );
}