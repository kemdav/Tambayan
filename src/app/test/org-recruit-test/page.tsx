"use client";

import React from "react";
import OrgRecruitCard from "@/app/components/ui/general/org-recruit-card";

const orgs = [
  {
    title: "Debate Club",
    orgID: "10",
    subtitle: "College of Arts",
    bgColor: "bg-green-300",
    tagText: "Active",
    tagBgColor: "bg-green-100",
    tagTextColor: "text-green-800",
    memberCount: 187,
    eventCount: 8,
    coverPhotoUrl: "/kemdavid.png",
    avatarUrl: "/kemdavid.png",
  },
  {
    title: "Computer Science Society",
    orgID: "1",
    subtitle: "College of Engineering",
    bgColor: "bg-green-200",
    tagText: "Active",
    tagBgColor: "bg-green-100",
    tagTextColor: "text-green-800",
    memberCount: 300,
    eventCount: 12,
    coverPhotoUrl: "/kemdavid.png",
    avatarUrl: "/kemdavid.png",
  },
];

export default function OrgRecruitTestPage() {
  return (
    <div className="flex flex-wrap gap-6 p-8 bg-gray-50 min-h-screen">
      {orgs.map((org) => (
        <OrgRecruitCard
          key={org.orgID}
          {...org}
          onView={() => alert(`Viewing ${org.title}`)}
          onJoin={() => alert(`Joining ${org.title}`)}
        />
      ))}
    </div>
  );
} 