// app/organization/[org-id]/wiki/page.tsx
"use server"; // This page now needs to be a server component to fetch data

import { getUserOrgRole } from "@/lib/actions/permissions";
import WikiListClient from "./WikiListClient"; // We will create this client component
import { getOrganizationProfile } from "@/lib/actions/organization";
import { getWikiSections } from "@/lib/actions/wiki"; // Assuming you have an action to get wiki sections


// This is the Server Component part of the page
export default async function WikiListPage(props: { params: Promise<{ 'org-id': string }> }) {
  const params = await props.params;

  const {
    'org-id': orgId
  } = params;

  const [
    { role },
    organization, // Get the full object
    wikiSections
  ] = await Promise.all([
    getUserOrgRole(orgId),
    getOrganizationProfile(orgId), // Fetches the full profile
    getWikiSections(orgId)
  ]);

  const officerRoles = ['President', 'VP', 'PRO', 'Secretary', 'Treasurer'];
  const canEdit = officerRoles.includes(role || '');

  console.log(`[WikiListPage] OrgID: ${orgId}`);
  console.log(`[WikiListPage] User Role from DB:`, role);
  console.log(`[WikiListPage] Calculated canEdit:`, canEdit);

  return (
    <WikiListClient
      orgId={orgId}                   // <-- WAS MISSING
      wikiSections={wikiSections}     // <-- WAS MISSING
      organization={organization}
      canEdit={canEdit}
    />
  );
}