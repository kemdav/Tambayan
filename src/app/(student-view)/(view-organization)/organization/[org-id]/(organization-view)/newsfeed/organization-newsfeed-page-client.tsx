// app/.../newsfeed/organization-newsfeed-page-client.tsx
"use client";

import { useState } from "react";
// Import your NEW header component
import OrganizationProfileHeader from "@/app/components/ui/organization-view-ui/OrganizationProfileHeadert"; 
import StudentOrgNewsfeedCard from "@/app/components/ui/student-view-ui/student-org-newsfeed-card";
import { myButtons } from "./navBarContents";
import { Poster } from "@/lib/types/types";
import { Tables } from "@/lib/database.types"; 

type OrganizationProfile = Tables<'organizations'>;

interface OrganizationNewsfeedPageClientProps {
  initialOrganizationProfile: OrganizationProfile; // Renamed for clarity
  officialPosts: Poster[];
  communityPosts: Poster[];
  currentUserId?: string;
  // You might want a prop to determine if the current user can edit
  // This would typically be checked on the server and passed down
  canManageOrg: boolean;
}

export default function OrganizationNewsfeedPageClient({
  initialOrganizationProfile,
  officialPosts,
  communityPosts,
  currentUserId,
  canManageOrg,
  canManageOrg: canEdit
}: OrganizationNewsfeedPageClientProps) {
  const [selectedNavId, setSelectedNavId] = useState<string>("official");
  // Manage the profile state here, so the header can update it
  const [organizationProfile, setOrganizationProfile] = useState(initialOrganizationProfile);

  // This function will be called by the header when an image is updated
  const handleProfileUpdate = (updatedData: Partial<OrganizationProfile>) => {
    setOrganizationProfile(prevProfile => ({
      ...prevProfile,
      ...updatedData
    }));
  };

  return (
    <main className="w-full grid place-items-center items-start mt-10 md:mt-0">
        <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
            <OrganizationProfileHeader
              isEditable={canManageOrg}
              initialProfile={organizationProfile}
              onProfileUpdate={handleProfileUpdate}
            />
            <StudentOrgNewsfeedCard
                className="h-1/2"
                myButtons={myButtons}
                selectedButtonId={selectedNavId}
                onButtonSelect={setSelectedNavId}
                officialPosts={officialPosts}
                communityPosts={communityPosts}
                canManageOrg={canManageOrg} // <-- Pass it down
                currentUserID={currentUserId} // <-- Pass it down
            />
        </div>
    </main>
  );
}