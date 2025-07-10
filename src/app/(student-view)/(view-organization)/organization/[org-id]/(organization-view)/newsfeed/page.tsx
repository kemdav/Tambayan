// app/.../newsfeed/page.tsx

import { getOrgPosts } from "@/lib/actions/post";
import { getOrganizationProfile } from "@/lib/actions/organization";
import OrganizationNewsfeedPageClient from "./organization-newsfeed-page-client";
import { getUserOrgRole } from '@/lib/actions/permissions';
import { createClient } from "@/lib/supabase/server"; // To get current user
import { getOrgUpcomingEvents } from '@/lib/actions/events'; 

interface NewsfeedPageProps {
  params: { "org-id": string; };
}

export default async function OrganizationNewsfeedPage(props: { params: Promise<{ 'org-id': string }> }) {
  const params = await props.params;
    const orgId = params['org-id'];
  const supabase = await createClient(); // Server client
  

  // Fetch organization profile
  const [
    organizationProfile,
    officialPosts,
    communityPosts,
    userRole, 
    { data: { user } },
    upcomingEventsData,
  ] = await Promise.all([
    getOrganizationProfile(orgId),
    getOrgPosts(orgId, true),
    getOrgPosts(orgId, false),
    getUserOrgRole(orgId), // <-- Use our new action
    supabase.auth.getUser(),
     getOrgUpcomingEvents(orgId),
  ]);

  if (!organizationProfile) {
    return <div>Organization not found.</div>;
  }

   const upcomingEvents = upcomingEventsData.map(event => ({
        ...event,
        date: event.date ? new Date(event.date).toISOString() : null,
    }));

  const officerRoles = ['President', 'VP', 'PRO'];
    const canManageOrg = officerRoles.includes(userRole.role || '');

  return (
    <OrganizationNewsfeedPageClient
      initialOrganizationProfile={organizationProfile}
      officialPosts={officialPosts}
      communityPosts={communityPosts}
      canManageOrg={canManageOrg} // <-- Pass this new prop
      currentUserId={user?.id ?? undefined}
       upcomingEvents={upcomingEvents}
    />
  );
}