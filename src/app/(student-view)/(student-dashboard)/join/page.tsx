// app/(student-dashboard)/join/page.tsx

import { createClient } from '@/lib/supabase/server';
import { redirect } from "next/navigation";
import JoinOrgCard from "@/app/components/ui/general/join-org-card";
import { OrgRecruitCardProps } from "@/app/components/ui/general/org-recruit-card";

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
    const avatarUrl = org.picture_path ? `${supabaseUrl}/storage/v1/object/public/organization-assets/${org.picture_path}` : undefined;
    const coverPhotoUrl = org.cover_photo_path ? `${supabaseUrl}/storage/v1/object/public/organization-assets/${org.cover_photo_path}` : undefined;

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
    <div className="container mx-auto py-8">
      <JoinOrgCard initialOrgs={transformedOrgs} />
    </div>
  );
}