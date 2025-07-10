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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/app/components/ui/general/dropdown/dialog";
import { Button } from "@/app/components/ui/general/button";
import { Input } from "@/app/components/ui/general/input/input";

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
  const [reviewOrg, setReviewOrg] = useState<{
    orgid: string;
    status: string;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

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

        const organizations = await getOrganizationsByStatus(
          status as AccreditationStatus
        );
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

  const handleReviewClick = (orgid: string, currentStatus: string) => {
    setReviewOrg({ orgid, status: currentStatus });
    setModalOpen(true);
  };

  const handleStatusChange = async (newStatus: AccreditationStatus) => {
    if (!reviewOrg) return;
    const result = await updateOrganizationAccreditationStatus(
      reviewOrg.orgid,
      newStatus,
      notes // pass notes
    );
    setModalOpen(false);
    setReviewOrg(null);
    setNotes("");
    if (result.success) {
      // Refresh data
      window.location.reload();
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

  // Find the file_path for the org being reviewed
  const reviewOrgData = reviewOrg
    ? orgRows.find((o) => o.orgid === reviewOrg.orgid)
    : null;
  const filePath = reviewOrgData?.file_path;

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
          <>
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
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
              <DialogContent className="rounded-2xl bg-white">
                <DialogHeader>
                  <DialogTitle>Review Organization</DialogTitle>
                </DialogHeader>
                {filePath ? (
                  <div className="mb-4">
                    <div className="bg-gray-100 rounded-lg w-full flex flex-col items-start">
                      <Button
                        variant="link"
                        className="w-full text-left p-2 h-auto text-blue-600 underline bg-transparent shadow-none hover:bg-transparent hover:underline focus:ring-0 focus:outline-none whitespace-normal break-words"
                        title="Download the PDF file"
                        onClick={() => {
                          if (filePath) {
                            const link = document.createElement("a");
                            link.href = filePath;
                            link.download = `accreditation-${
                              reviewOrg?.orgid || "document"
                            }.pdf`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          }
                        }}
                      >
                        Click here to download the PDF file.
                      </Button>
                      {copied && (
                        <span className="ml-2 text-green-600 text-sm">
                          Downloading...
                        </span>
                      )}
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="review-notes"
                        className="block mb-1 font-medium"
                      >
                        Notes
                      </label>
                      <Input
                        id="review-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Enter your review notes here..."
                        className="w-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 text-gray-500">
                    No PDF file submitted.
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  <Button
                    variant="default"
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleStatusChange("Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="default"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    onClick={() => handleStatusChange("Revision")}
                  >
                    Needs Revision
                  </Button>
                  <Button
                    variant="default"
                    className="bg-red-700 hover:bg-red-800 text-white"
                    onClick={() => handleStatusChange("Rejected")}
                  >
                    Reject
                  </Button>
                  <DialogClose asChild>
                    <Button variant="link" className="mt-2">
                      Cancel
                    </Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
