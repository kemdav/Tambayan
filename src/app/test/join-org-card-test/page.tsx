"use client";

import React from "react";
import JoinOrgCard, { JOIN_ORG_CARD_BG } from "@/app/components/ui/general/join-org-card";
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
    avatarUrl: undefined,
    coverPhotoUrl: undefined,
  },
  {
    title: "Debate Club",
    subtitle: "College of Arts",
    orgID: "12",
    bgColor: "bg-green-300",
    tagText: "Active",
    tagBgColor: "bg-green-100",
    tagTextColor: "text-green-800",
    memberCount: 187,
    eventCount: 8,
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
    avatarUrl: undefined,
    coverPhotoUrl: undefined,
  },
];
export default function JoinOrgCardTestPage() {
  const router = useRouter();
  const handleView = (orgID: string) => {
    router.push(`/organization/${orgID}`);
  };

  const handleJoin = (orgID: string) => {
    alert(`Joining organization with ID: ${orgID}`);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: JOIN_ORG_CARD_BG }}>
      <h1 className="text-2xl font-bold mb-6">Join Organizations</h1>
      <JoinOrgCard orgs={sampleOrgs}  onViewClick={handleView} onJoinClick={handleJoin}/>
    </div>
  );
} 