// app/organization/[org-id]/wiki/[wiki-id]/page.tsx
"use server";

import { getUserOrgRole } from "@/lib/actions/permissions";
import WikiViewClient, { WikiPageData } from "./WikiViewClient"; 
import { getOrganizationProfile } from "@/lib/actions/organization";
import { getWikiPage } from "@/lib/actions/wiki";
export default async function WikiDetailPage(props: { params: Promise<{ 'org-id': string, 'wiki-id': string }> }) {
  const params = await props.params;

  const {
    'org-id': orgId,
    'wiki-id': wikiId
  } = params;

  
  const [{ role }, organization, wikiPageDataFromDb] = await Promise.all([ // Renamed for clarity
    getUserOrgRole(orgId),
    getOrganizationProfile(orgId),
    getWikiPage(Number(wikiId))
  ]);
   const officerRoles = ['President', 'VP', 'PRO', 'Secretary', 'Treasurer'];
  const canEdit = officerRoles.includes(role || '');

  if (!wikiPageDataFromDb || !wikiPageDataFromDb.orgid) {
    return <div>Wiki page not found or is invalid.</div>;
  }

  
  const wikiPageForClient = wikiPageDataFromDb as WikiPageData;
  return (
      <WikiViewClient
        canEdit={canEdit}
        wikiPage={wikiPageForClient} 
        organization={organization}
      />
  );
}