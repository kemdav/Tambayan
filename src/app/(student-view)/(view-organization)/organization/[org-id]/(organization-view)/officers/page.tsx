// app/organization/[org-id]/manage/officers/page.tsx
"use server";

import { getOrganizationProfile } from "@/lib/actions/organization";
import { getOrganizationMembers } from "@/lib/actions/organization";
import { getUserOrgRole } from "@/lib/actions/permissions";
import OfficersClient from "./OfficersClient";

interface PageProps {
  params: { 'org-id': string };
}

export default async function OfficersPage({ params: { 'org-id': orgId } }: PageProps) {
  // Fetch data in parallel
  const [
    organization,
    members,
    { role: currentUserRole }
  ] = await Promise.all([
    getOrganizationProfile(orgId),
    getOrganizationMembers(orgId),
    getUserOrgRole(orgId)
  ]);

  // Define who has management permission
  const canManage = currentUserRole === 'President'; // Or use an array: ['President', 'VP'].includes(...)

  return (
    <main className="w-full">
      <OfficersClient
        orgId={orgId}
        organization={organization}
        initialMembers={members}
        canManage={canManage}
      />
    </main>
  );
}