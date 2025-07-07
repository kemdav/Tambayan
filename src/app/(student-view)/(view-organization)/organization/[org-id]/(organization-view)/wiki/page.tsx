// app/organization/[org-id]/wiki/page.tsx
"use server"; // This page now needs to be a server component to fetch data

import { getUserOrgRole } from "@/lib/actions/permissions";
import WikiListClient from "./WikiListClient"; // We will create this client component
import { getOrganizationProfile } from "@/lib/actions/organization";
import { getWikiSections } from "@/lib/actions/wiki"; // Assuming you have an action to get wiki sections

// This is the Server Component part of the page
export default async function WikiListPage({ params: { 'org-id': orgId } }: { params: { 'org-id': string } }) {
  
  const [
    { role },
    organization, // Get the full object
    wikiSections
  ] = await Promise.all([
    getUserOrgRole(orgId),
    getOrganizationProfile(orgId), // Fetches the full profile
    getWikiSections(orgId)
  ]);

  const canEdit = !!role; // User can edit if they have any role in the org

  return (
    <WikiListClient 
      organization={organization}
      wikiSections={wikiSections}
      canEdit={canEdit}
    />
  );
}