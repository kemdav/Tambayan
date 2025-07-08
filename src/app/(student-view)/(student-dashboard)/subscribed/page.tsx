// app/subscribed/page.tsx

import { createClient } from '@/lib/supabase/server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SubscribedOrgComponent from "@/app/components/ui/general/subscribed-org-component";
import { ShowcaseCardProps } from "@/app/components/ui/general/showcase-card-component";
const DEFAULT_AVATAR_URL = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Org';

// These type definitions are correct.
type OrganizationData = {
  orgid: string;
  orgname: string;
  status: string;
  picture: string | null;
  cover_photo_path: string | null;
  orgmember: { count: number }[];
  events: { count: number }[];
};

type SubscribedOrgData = {
  organizations: OrganizationData;
};

export default async function SubscribedOrgsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { redirect("/login"); }

  const { data: studentProfile, error: profileError } = await supabase
    .from("student").select("studentid").eq("user_id", user.id).single();

  if (profileError || !studentProfile) {
    return <div>Error: Student profile not found.</div>;
  }
  
  const { data: subscribedOrgsData, error: orgsError } = await supabase
    .from("subscribedorg")
    .select(`
      organizations!inner (
        orgid, orgname, status, picture, cover_photo_path,
        orgmember(count), events(count)
      )
    `)
    .eq("studentid", studentProfile.studentid)
    // Add this line to apply your manual types to the query result
    .returns<SubscribedOrgData[]>(); 
    
  
  if (orgsError) {
    console.error("Error fetching subscribed orgs:", orgsError);
    return <div>Error fetching organization data.</div>;
  }

  // --- THE CORRECTED TRANSFORMATION LOGIC ---
  
  const transformedOrgs: ShowcaseCardProps[] = [];

  for (const item of subscribedOrgsData || []) {
    if (!item || !item.organizations) {
      continue;
    }

    const org = item.organizations;
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

    const newOrgCard: ShowcaseCardProps = {
      orgID: org.orgid,
      title: org.orgname,
      subtitle: "Subscribed Organization",
      memberCount: org.orgmember[0]?.count ?? 0,
      eventCount: org.events[0]?.count ?? 0,
      avatarUrl: avatarUrl,
      coverPhotoUrl: coverPhotoUrl,
      tagText: org.status,
      tagBgColor: org.status === 'active' ? 'bg-green-100' : 'bg-red-100',
      tagTextColor: org.status === 'active' ? 'text-green-800' : 'text-red-800',
      buttons: [
        { label: "View", bgColor: "bg-action-fresh-green", textColor: "text-black" },
        { label: "Unsubscribe", bgColor: "bg-red-500", textColor: "text-white" },
      ],
    };

    transformedOrgs.push(newOrgCard);
  }

  return (
    <div className="w-full grid place-items-center items-start">
      <div className="mainContentCard">
        <SubscribedOrgComponent initialOrgs={transformedOrgs} />
      </div>
    </div>
  );
}