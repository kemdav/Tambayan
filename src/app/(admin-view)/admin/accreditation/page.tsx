"use client";
import { useState } from "react";
import AccreditCombinedComponents from "@/app/components/ui/general/accreditation-components/accredit-combined-components";

export default function AccreditationPage() {
  const [activeTab, setActiveTab] = useState("Pending Review");

  // Sample data - you can replace these with actual data from your backend
  const sampleData = {
    pendingCount: 5,
    approvedCount: 12,
    needsRevisionCount: 3,
    rejectedCount: 2,
    tabs: ["Pending Review", "Approved", "Needs Revision", "Rejected"],
  };

  const handleTabChange = (tab: string) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Header Card */}
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Accreditation Page</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1089px] mx-auto bg-white border rounded-[10px] shadow-sm p-6">
        <AccreditCombinedComponents
          pendingCount={sampleData.pendingCount}
          approvedCount={sampleData.approvedCount}
          needsRevisionCount={sampleData.needsRevisionCount}
          rejectedCount={sampleData.rejectedCount}
          onPendingView={() => handleTabChange("Pending Review")}
          onApprovedView={() => handleTabChange("Approved")}
          onNeedsRevisionView={() => handleTabChange("Needs Revision")}
          onRejectedView={() => handleTabChange("Rejected")}
          tabs={sampleData.tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          orgRows={[]}
        />
      </div>
    </div>
  );
}
