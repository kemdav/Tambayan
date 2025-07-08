// app/(student-dashboard)/join/page.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";
import JoinOrgCard from "@/app/components/ui/general/join-org-card";
import { OrgRecruitCardProps } from "@/app/components/ui/general/org-recruit-card";
const DEFAULT_AVATAR_URL = 'https://placehold.co/100x100/CCCCCC/FFFFFF?text=Org';

// Define a type for the data returned by our new function
interface OrgJoinData {
  org_id: string;
  org_name: string | null;
  org_status: string | null;
  picture_path: string | null;
  cover_photo_path: string | null;
  member_count: number;
  event_count: number;
  is_subscribed: boolean;
}

export default async function JoinOrganizationPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }

  // --- THIS IS THE NEW, SIMPLIFIED LOGIC ---

  // 1. Make a single call to our new RPC function, passing the user's ID.
  const { data: orgsData, error } = await supabase
    .rpc('get_organizations_for_join_page', { p_user_id: user.id })
    .returns<OrgJoinData[]>();

  if (error) {
    console.error("Error fetching organizations via RPC:", error);
    return <div>Error fetching organization data. Please try again later.</div>;
  }

  if (!orgsData) {
    return <div>No organizations found for your university.</div>
  }

  // 2. Transform the data directly. No more manual joining needed!

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return <div>Configuration error.</div>;

  const transformedOrgs: OrgRecruitCardProps[] = orgsData.map((org) => {
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
    const avatarUrl = getFinalUrl(org.picture_path) || DEFAULT_AVATAR_URL; // Use default if the final URL is undefined
    const coverPhotoUrl = getFinalUrl(org.cover_photo_path);

    return {
      orgID: org.org_id,
      title: org.org_name || "Untitled Organization",
      subtitle: "University Organization",
      memberCount: org.member_count,
      eventCount: org.event_count,
      avatarUrl: avatarUrl,
      coverPhotoUrl: coverPhotoUrl,
      tagText: org.org_status === 'active' ? 'Active' : 'Inactive',
      tagBgColor: org.org_status === 'active' ? 'bg-green-100' : 'bg-red-100',
      tagTextColor: org.org_status === 'active' ? 'text-green-800' : 'text-red-800',
      joinLabel: org.is_subscribed ? "Subscribed" : "Subscribe", // Use the pre-calculated boolean
      joinDisabled: org.is_subscribed,
    };
  });

  return (
    <div className='w-full grid place-items-center items-start'>
      <div className="mainContentCard">
        <JoinOrgCard initialOrgs={transformedOrgs} />
      </div>
    </div>
  );
}