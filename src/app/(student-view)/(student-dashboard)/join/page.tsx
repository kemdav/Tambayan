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
    <main className="w-full grid place-items-center items-start">
      <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
      </div>
    </main>
  );
} 