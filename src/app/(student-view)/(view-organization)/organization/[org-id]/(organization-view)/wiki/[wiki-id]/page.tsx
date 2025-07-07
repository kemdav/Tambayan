// app/organization/[org-id]/wiki/[wiki-id]/page.tsx
"use server";

import { getUserOrgRole } from "@/lib/actions/permissions";
import WikiViewClient from "./WikiViewClient"; // Create this client component
import { getOrganizationProfile } from "@/lib/actions/organization";
// import { getWikiContent } from "@/lib/actions/wiki"; // You'll need an action for this
export default async function WikiDetailPage({ params: { 'org-id': orgId, 'wiki-id': wikiId } }: { params: { 'org-id': string, 'wiki-id': string } }) {
  
  const [{ role }, organization] = await Promise.all([
    getUserOrgRole(orgId),
    getOrganizationProfile(orgId)
  ]);
  const canEdit = !!role;

  const wikiPageData = {
    title: "How to Join",
    content: `### Steps to Join ICpEP \n\n * **Eligibility Criteria:** Must be a student in a computer engineering program.`
  };


  return (
      <WikiViewClient
        canEdit={canEdit}
        wikiTitle={wikiPageData.title}
        wikiContent={wikiPageData.content}
        organization={organization}
      />
  );
}