"use client";

import React, { useState, useCallback } from "react";
import AccreditCombinedComponents from "../../components/ui/general/accreditation-components/accredit-combined-components";

export default function AccreditPracticeShow() {
  const [pendingCount, setPendingCount] = useState(12);
  const [approvedCount, setApprovedCount] = useState(24);
  const [needsRevisionCount, setNeedsRevisionCount] = useState(8);
  const [rejectedCount, setRejectedCount] = useState(5);

  const [activeTab, setActiveTab] = useState("Pending Review");
  const tabs = ["Pending Review", "Approved", "Needs Revision", "Rejected", "New Accreditation"];

  const orgRows = [
    {
      organization: "Robotics Club",
      submitted: "Oct 15, 2023",
      school: "College of Engineering",
      status: "Pending",
      onReviewClick: () => alert("Review Robotics Club"),
    },
    {
      organization: "Environmental Society",
      submitted: "Oct 12, 2023",
      school: "College of Science",
      status: "Pending",
      onReviewClick: () => alert("Review Environmental Society"),
    },
  ];

  const handlePendingViewClick = useCallback(() => alert("View Applications clicked!"), []);
  const handleApprovedViewClick = useCallback(() => alert("View Organizations clicked!"), []);
  const handleNeedsRevisionViewClick = useCallback(() => alert("View Applications (Needs Revision) clicked!"), []);
  const handleRejectedViewClick = useCallback(() => alert("View Applications (Rejected) clicked!"), []);
  const handleTabChange = useCallback((tab: string) => setActiveTab(tab), []);

  return (
    <AccreditCombinedComponents
      pendingCount={pendingCount}
      approvedCount={approvedCount}
      needsRevisionCount={needsRevisionCount}
      rejectedCount={rejectedCount}
      onPendingView={handlePendingViewClick}
      onApprovedView={handleApprovedViewClick}
      onNeedsRevisionView={handleNeedsRevisionViewClick}
      onRejectedView={handleRejectedViewClick}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      orgRows={orgRows}
    />
  );
} 