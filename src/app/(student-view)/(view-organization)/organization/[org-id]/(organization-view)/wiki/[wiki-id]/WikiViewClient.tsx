// .../wiki/[wiki-id]/WikiViewClient.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WikiViewComponent from "@/app/components/ui/general/view-wiki";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { Tables } from "@/lib/database.types";
import { FaInfoCircle } from "react-icons/fa";
import OrganizationProfileHeader from "@/app/components/ui/organization-view-ui/OrganizationProfileHeadert";

type OrganizationProfile = Tables<'organizations'>;

interface WikiViewClientProps {
  canEdit: boolean;
  wikiTitle: string;
  wikiContent: string;
  organization: OrganizationProfile | null;
}

// The client component receives the permission flag
export default function WikiViewClient({ canEdit, wikiTitle, wikiContent, organization }: WikiViewClientProps) {
    const router = useRouter();
    const [profile, setProfile] = useState(organization);

    const handleBack = () => {
        router.back();
    };

     if (!profile) {
      return <div>Loading...</div>;
    }
    return (
        <div className="w-full grid place-items-center items-start mt-10 md:mt-0">
            <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
                {/* Make header editability dynamic */}
                <OrganizationProfileHeader
                    isEditable={canEdit}
                    initialProfile={profile} // profile is guaranteed not to be null here
                    onProfileUpdate={(updatedData) => {
                      setProfile(prev => {
                        // FIX: Handle the case where prev could be null
                        if (!prev) return null;
                        return { ...prev, ...updatedData };
                      });
                    }}
                />
                 <WikiViewComponent
                    title={wikiTitle}
                    icon={<FaInfoCircle className="text-green-700" />}
                    description={wikiContent}
                    canEdit={canEdit}
                    onBack={handleBack}
                />
            </div>
        </div>
    );
}