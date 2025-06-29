import React from "react";
import SubscribedOrgComponent, { SUBSCRIBED_ORG_CARD_BG } from "@/app/components/ui/general/subscribed-org-component";

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
  return (
    <div className="min-h-screen p-6" style={{ background: SUBSCRIBED_ORG_CARD_BG }}>
      <h1 className="text-2xl font-bold mb-6">Subscribed Organizations</h1>
      <SubscribedOrgComponent orgs={sampleOrgs} />
    </div>
  );
} 