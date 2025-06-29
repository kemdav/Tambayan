"use client";
import React from "react";
import SubscribedOrgComponent, { SUBSCRIBED_ORG_CARD_BG } from "@/app/components/ui/general/subscribed-org-component";
import { useRouter } from "next/navigation";

const sampleOrgs = [
  {
    title: "Computer Science Society",
    subtitle: "College of Engineering",
    orgID: "1",
    bgColor: "bg-green-200",
    tagText: "Active",
    tagBgColor: "bg-green-100",
    tagTextColor: "text-green-800",
    memberCount: 245,
    eventCount: 12,
    buttons: [
      { label: "View", bgColor: "bg-green-300", textColor: "text-white" },
    ],
    avatarUrl: undefined,
    coverPhotoUrl: undefined,
  },
  {
    title: "Debate Club",
    subtitle: "College of Arts",
    bgColor: "bg-green-300",
    orgID: "12",
    tagText: "Active",
    tagBgColor: "bg-green-100",
    tagTextColor: "text-green-800",
    memberCount: 187,
    eventCount: 8,
    buttons: [
      { label: "View", bgColor: "bg-green-300", textColor: "text-white" },
    ],
    avatarUrl: undefined,
    coverPhotoUrl: undefined,
  },
  {
    title: "Music Club",
    subtitle: "College of Arts",
    orgID: "14",
    bgColor: "bg-green-200",
    tagText: "Inactive",
    tagBgColor: "bg-red-100",
    tagTextColor: "text-red-800",
    memberCount: 56,
    eventCount: 0,
    buttons: [
      { label: "View", bgColor: "bg-green-300", textColor: "text-white" },
    ],
    avatarUrl: undefined,
    coverPhotoUrl: undefined,
  },
];

export default function SubscribedOrgTestPage() {
  const router = useRouter();
   const handleNavigate = (orgID: string) => {
    console.log(`Parent component is navigating to organization: ${orgID}`);
    router.push(`/organization/${orgID}`);
  };
  return (
    <div className="w-full grid place-items-center items-start">
      <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
        <SubscribedOrgComponent orgs={sampleOrgs} onButtonClick={handleNavigate} />
      </div>
    </div>
  );
} 