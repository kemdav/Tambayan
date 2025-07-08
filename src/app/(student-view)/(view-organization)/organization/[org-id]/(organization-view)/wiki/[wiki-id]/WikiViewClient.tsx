// .../wiki/[wiki-id]/WikiViewClient.tsx
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import WikiViewComponent from "@/app/components/ui/general/view-wiki";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { Tables } from "@/lib/database.types";
import { FaInfoCircle } from "react-icons/fa";
import OrganizationProfileHeader from "@/app/components/ui/organization-view-ui/OrganizationProfileHeadert";
import { updateWikiPage } from "@/lib/actions/wiki";
import WikiViewCard from "@/app/components/ui/general/wiki-view-card";

type OrganizationProfile = Tables<'organizations'>;
export interface WikiPageData {
  wikiid: number;
  section: string | null;
  content: string | null;
  orgid: string;
}
interface WikiViewClientProps {
  canEdit: boolean;
  wikiPage: WikiPageData;
  organization: OrganizationProfile | null;
}


// The client component receives the permission flag
export default function WikiViewClient({ canEdit, wikiPage, organization }: WikiViewClientProps) {
  const router = useRouter();
  const [profile, setProfile] = useState(organization);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(wikiPage.section || 'Untitled Section'); // <-- Use fallback
  const [content, setContent] = useState(wikiPage.content || ''); // <-- Use fallback
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEnterEditMode = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    // Reset title and content to their original values from props
    setTitle(wikiPage.section || 'Untitled Section');
    setContent(wikiPage.content || '');
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);
    const result = await updateWikiPage(wikiPage.wikiid, title, content, wikiPage.orgid);
    setIsSubmitting(false);

    if (result.error) {
      alert(result.error);
      // Optional: revert changes on error
      handleCancelEdit();
    } else {
      // On success, simply exit edit mode. The new title/content are already in state.
      // We can also update the 'original' prop value in state if needed, but this is simpler.
      setIsEditing(false);
    }
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
        <WikiViewCard
          title={title}
          description={content}
          isEditing={isEditing}
          hasPermission={canEdit}
          onTitleChange={setTitle}
          onDescriptionChange={setContent}
          onSave={handleSaveChanges}
          onCancel={handleCancelEdit}
          onEdit={handleEnterEditMode}
        />
      </div>
    </div>
  );
}