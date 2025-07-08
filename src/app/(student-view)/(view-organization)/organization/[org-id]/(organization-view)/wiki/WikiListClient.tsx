// app/organization/[org-id]/wiki/WikiListClient.tsx
"use client";

import OrganizationProfileHeader from "@/app/components/ui/organization-view-ui/OrganizationProfileHeadert";
import { Tables } from "@/lib/database.types";
import { useState } from "react";
import WikiCardWithLinks from "@/app/components/ui/general/wiki-card-with-links";


interface WikiSection {
  id: string;
  title: string;
}
type OrganizationProfile = Tables<'organizations'>;
interface WikiListClientProps {
  orgId: string;
  organization: OrganizationProfile | null;
  wikiSections: { id: string, title: string }[]; // You are already receiving this
  canEdit: boolean;
}

export default function WikiListClient({ orgId, organization, wikiSections, canEdit }: WikiListClientProps)  {
const [profile, setProfile] = useState(organization);

  if (!profile) {
    // We handle the null case here, so the header won't receive null
    return <div>Organization not found or is loading...</div>;
  }

  return (
    <div className="w-full grid place-items-center items-start mt-10 md:mt-0">
      <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
        {/* Pass the permission to the header */}
        <OrganizationProfileHeader
          isEditable={canEdit}
          initialProfile={profile}
          onProfileUpdate={(updatedData) => {
            setProfile(prev => {
              // If there's no previous profile, we can't update it.
              if (!prev) return null; 
              // Otherwise, safely spread and update.
              return { ...prev, ...updatedData };
            });
          }}
        />
        <WikiCardWithLinks
          hasPermission={canEdit}
          initialWikiSections={wikiSections} // Pass the sections from props
          orgId={orgId} // Pass the orgId from props
        />
      </div>
    </div>
  );
}