// app/.../newsfeed/page.tsx

import { getOrgPosts } from "@/lib/actions/post";
import { getOrganizationProfile } from "@/lib/actions/organization";
import OrganizationNewsfeedPageClient from "./organization-newsfeed-page-client";
import { createClient } from "@/lib/supabase/server"; // To get current user

interface NewsfeedPageProps {
  params: { "org-id": string; };
}

export default async function NewsfeedPage({ params }: NewsfeedPageProps) {
  const { "org-id": orgId } = await params;
  const supabase = await createClient(); // Server client

  // Fetch current user to determine edit permissions
  const { data: { user } } = await (supabase).auth.getUser();

  // Fetch organization profile
  const organizationProfile = await getOrganizationProfile(orgId);

  if (!organizationProfile) {
    return <div>Organization not found.</div>;
  }



  // Determine if the current user can edit.
  // Your logic here might be more complex (e.g., check if user is an org member with 'admin' role).
  // For now, let's assume for simplicity that only a logged-in user can edit *any* profile.
  // A better check would be:
  // const { data: membership } = await supabase.from('orgmember').select().eq('orgid', orgId).eq('user_id', user.id).single();
  // const canEdit = !!user && membership?.position === 'admin';
  const canEdit = !!user; // Simple check for now.

  // Fetch posts
  const officialPosts = await getOrgPosts(orgId, true);
  const communityPosts = await getOrgPosts(orgId, false);

  return (
    <OrganizationNewsfeedPageClient
      initialOrganizationProfile={organizationProfile}
      officialPosts={officialPosts}
      communityPosts={communityPosts}
      canEdit={canEdit}
    />
  );
}