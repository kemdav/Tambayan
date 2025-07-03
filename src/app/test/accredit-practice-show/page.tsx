"use client";

import React, { useState, useCallback } from "react";
import AccreditCombinedComponents from "../../components/ui/general/accreditation-components/accredit-combined-components";

export default function AccreditPracticeShow() {
  const [pendingCount, setPendingCount] = useState(12);
  const [approvedCount, setApprovedCount] = useState(24);
  const [needsRevisionCount, setNeedsRevisionCount] = useState(8);
  const [rejectedCount, setRejectedCount] = useState(5);

  const [activeTab, setActiveTab] = useState("Pending Review");
  const tabs = [
    "Pending Review",
    "Approved",
    "Needs Revision",
    "Rejected",
    "New Accreditation",
  ];

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
    {
      organization: "Literature Circle",
      submitted: "Oct 10, 2023",
      school: "College of Humanities",
      status: "Pending",
      onReviewClick: () => alert("Review Literature Circle"),
    },
    {
      organization: "Music Ensemble",
      submitted: "Oct 9, 2023",
      school: "College of Music",
      status: "Pending",
      onReviewClick: () => alert("Review Music Ensemble"),
    },
    {
      organization: "Photography Club",
      submitted: "Oct 8, 2023",
      school: "College of Fine Arts",
      status: "Pending",
      onReviewClick: () => alert("Review Photography Club"),
    },
    {
      organization: "Debate Society",
      submitted: "Oct 7, 2023",
      school: "College of Law",
      status: "Pending",
      onReviewClick: () => alert("Review Debate Society"),
    },
    {
      organization: "Science Innovators",
      submitted: "Oct 6, 2023",
      school: "College of Science",
      status: "Pending",
      onReviewClick: () => alert("Review Science Innovators"),
    },
    {
      organization: "Drama Club",
      submitted: "Oct 5, 2023",
      school: "College of Arts",
      status: "Pending",
      onReviewClick: () => alert("Review Drama Club"),
    },
    {
      organization: "Entrepreneurship Org",
      submitted: "Oct 4, 2023",
      school: "College of Business",
      status: "Pending",
      onReviewClick: () => alert("Review Entrepreneurship Org"),
    },
    {
      organization: "Astronomy Group",
      submitted: "Oct 3, 2023",
      school: "College of Science",
      status: "Pending",
      onReviewClick: () => alert("Review Astronomy Group"),
    },
    {
      organization: "Film Makers",
      submitted: "Oct 2, 2023",
      school: "College of Fine Arts",
      status: "Pending",
      onReviewClick: () => alert("Review Film Makers"),
    },
    {
      organization: "Eco Warriors",
      submitted: "Oct 1, 2023",
      school: "College of Environmental Studies",
      status: "Pending",
      onReviewClick: () => alert("Review Eco Warriors"),
    },
    {
      organization: "Chess Masters",
      submitted: "Sep 30, 2023",
      school: "College of Science",
      status: "Pending",
      onReviewClick: () => alert("Review Chess Masters"),
    },
    {
      organization: "Robotics Innovators",
      submitted: "Sep 29, 2023",
      school: "College of Engineering",
      status: "Pending",
      onReviewClick: () => alert("Review Robotics Innovators"),
    },
    {
      organization: "Writers Guild",
      submitted: "Sep 28, 2023",
      school: "College of Humanities",
      status: "Pending",
      onReviewClick: () => alert("Review Writers Guild"),
    },
    {
      organization: "Art Guild",
      submitted: "Sep 30, 2023",
      school: "College of Arts",
      status: "Revision",
      onReviewClick: () => alert("Review Art Guild"),
    },
    {
      organization: "Chess Club",
      submitted: "Oct 1, 2023",
      school: "College of Science",
      status: "Rejected",
      onReviewClick: () => alert("Review Chess Club"),
    },
    {
      organization: "Math Society",
      submitted: "Oct 5, 2023",
      school: "College of Science",
      status: "Approved",
      onReviewClick: () => alert("Review Math Society"),
    },
  ];

  const handlePendingViewClick = useCallback(
    () => alert("View Applications clicked!"),
    []
  );
  const handleApprovedViewClick = useCallback(
    () => alert("View Organizations clicked!"),
    []
  );
  const handleNeedsRevisionViewClick = useCallback(
    () => alert("View Applications (Needs Revision) clicked!"),
    []
  );
  const handleRejectedViewClick = useCallback(
    () => alert("View Applications (Rejected) clicked!"),
    []
  );
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
