"use client";

import OrgCard from "@/app/components/ui/general/org-card";

export default function OrganizationCardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <OrgCard
        name="ICpEP SE CIT-U Chapter"
        description="College of Engineering"
        membersCount={245}
        avatarUrl="Kamo na bahala butang ani hahaha"
        isAvatarEditable={false}
      />
    </div>
  );
}
