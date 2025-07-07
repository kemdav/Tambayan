// app/organization/[org-id]/wiki/WikiListClient.tsx
"use client";

import { FaBook, FaUser, FaCogs } from "react-icons/fa";
import WikiListComponent from "@/app/components/ui/general/wiki-list-component";
import { useRouter } from "next/navigation";
import OrganizationProfileHeader from "@/app/components/ui/organization-view-ui/OrganizationProfileHeadert";
import { Tables } from "@/lib/database.types";
import { useState } from "react";

interface WikiSection {
  id: string;
  title: string;
}
type OrganizationProfile = Tables<'organizations'>;
interface WikiListClientProps {
  organization: OrganizationProfile | null;
  wikiSections: WikiSection[];
  canEdit: boolean; // <-- Receive permission from server
}

const icons: { [key: string]: React.ReactNode } = {
  "Introduction": <FaBook />,
  "How to Join": <FaUser />,
  "Settings & Tools": <FaCogs />,
};

export default function WikiListClient({ organization, wikiSections, canEdit }: WikiListClientProps) {
  const router = useRouter();
   const [profile, setProfile] = useState(organization);

  const cardsWithNavigation = wikiSections.map(card => ({
    ...card,
    icon: icons[card.title] || <FaBook />,
    onClick: () => router.push(`wiki/${card.id}`), // Assumes relative path works
  }));

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
        <WikiListComponent textcolor="text-green-700" cards={cardsWithNavigation} />
      </div>
    </div>
  );
}