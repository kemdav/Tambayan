// app/.../newsfeed/page.tsx

import { getOrgPosts } from "@/lib/actions/post";
import { getOrganizationProfile } from "@/lib/actions/organization";
import OrganizationNewsfeedPageClient from "./organization-newsfeed-page-client";
import { getUserOrgRole } from '@/lib/actions/permissions';
import { createClient } from "@/lib/supabase/server"; // To get current user

interface NewsfeedPageProps {
  params: { "org-id": string; };
}

export default async function NewsfeedPage({ params }: NewsfeedPageProps) {
  const { "org-id": orgId } = await params;
  const supabase = await createClient(); // Server client

  // Fetch organization profile
  const [
    organizationProfile,
    officialPosts,
    communityPosts,
    userRole, // <-- Get the user's role
    { data: { user } } // <-- Get the current user
  ] = await Promise.all([
    getOrganizationProfile(orgId),
    getOrgPosts(orgId, true),
    getOrgPosts(orgId, false),
    getUserOrgRole(orgId), // <-- Use our new action
    supabase.auth.getUser()
  ]);

  if (!organizationProfile) {
    return <div>Organization not found.</div>;
  }

  const canManageOrg = !!userRole.role;

  return (
    <OrganizationNewsfeedPageClient
      initialOrganizationProfile={organizationProfile}
      officialPosts={officialPosts}
      communityPosts={communityPosts}
      canManageOrg={canManageOrg} // <-- Pass this new prop
      currentUserId={user?.id ?? undefined}
    />
  );
}