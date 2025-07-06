"use client";
import { useState, useEffect } from "react";
import AccreditCombinedComponents from "@/app/components/ui/general/accreditation-components/accredit-combined-components";
import {
  getAccreditationStats,
  getOrganizationsByStatus,
  updateOrganizationAccreditationStatus,
  type AccreditationData,
  type AccreditationStatus,
} from "@/lib/actions/accreditation";

export default function AccreditationPage() {
  const [activeTab, setActiveTab] = useState("Pending Review");
  const [stats, setStats] = useState({
    pendingCount: 0,
    approvedCount: 0,
    needsRevisionCount: 0,
    rejectedCount: 0,
  });
  const [orgRows, setOrgRows] = useState<AccreditationData[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = ["Pending Review", "Approved", "Needs Revision", "Rejected"];

  // Load accreditation statistics
  useEffect(() => {
    const loadStats = async () => {
      try {
        const accreditationStats = await getAccreditationStats();
        setStats({
          pendingCount: accreditationStats.pending_count,
          approvedCount: accreditationStats.approved_count,
          needsRevisionCount: accreditationStats.revision_count,
          rejectedCount: accreditationStats.rejected_count,
        });
      } catch (error) {
        console.error("Error loading accreditation stats:", error);
      }
    };

    loadStats();
  }, []);

  // Load organizations by status
  useEffect(() => {
    const loadOrganizations = async () => {
      setLoading(true);
      try {
        let status: string;
        switch (activeTab) {
          case "Pending Review":
            status = "Pending";
            break;
          case "Approved":
            status = "Approved";
            break;
          case "Needs Revision":
            status = "Revision";
            break;
          case "Rejected":
            status = "Rejected";
            break;
          default:
            status = "Pending";
        }

        const organizations = await getOrganizationsByStatus(status);
        setOrgRows(organizations);
      } catch (error) {
        console.error("Error loading organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrganizations();
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    console.log("Tab changed to:", tab);
    setActiveTab(tab);
  };

  const handleReviewClick = async (orgid: string, currentStatus: string) => {
    try {
      // This would typically open a review modal or navigate to a review page
      console.log(
        `Reviewing organization ${orgid} with status ${currentStatus}`
      );

      // Example: Update status to approved
      // const result = await updateOrganizationAccreditationStatus(orgid, 'Approved');
      // if (result.success) {
      //   // Refresh the data
      //   window.location.reload();
      // }
    } catch (error) {
      console.error("Error reviewing organization:", error);
    }
  };

  // Transform organization data to match the expected format
  const transformedOrgRows = orgRows.map((org) => ({
    organization: org.orgname || "Unknown Organization",
    submitted: org.created ? new Date(org.created).toLocaleDateString() : "N/A",
    school: org.university?.uname || "Unknown School",
    status: (org.status as AccreditationStatus) || "Pending",
    onReviewClick: () => handleReviewClick(org.orgid, org.status || "Pending"),
  }));

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      {/* Header Card */}
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">Accreditation Page</h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1089px] mx-auto bg-white border rounded-[10px] shadow-sm p-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading accreditation data...</p>
          </div>
        ) : (
          <AccreditCombinedComponents
            pendingCount={stats.pendingCount}
            approvedCount={stats.approvedCount}
            needsRevisionCount={stats.needsRevisionCount}
            rejectedCount={stats.rejectedCount}
            onPendingView={() => handleTabChange("Pending Review")}
            onApprovedView={() => handleTabChange("Approved")}
            onNeedsRevisionView={() => handleTabChange("Needs Revision")}
            onRejectedView={() => handleTabChange("Rejected")}
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            orgRows={transformedOrgRows}
          />
        )}
      </div>
    </div>
  );
}
