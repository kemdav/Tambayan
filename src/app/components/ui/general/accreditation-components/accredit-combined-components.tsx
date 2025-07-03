import React, { useState, useCallback } from "react";
import PendingRevCard from "./pending-rev-card";
import ApprovedCard from "./approved-card";
import NeedsRevisionCard from "./needs-revision-card";
import RejectedCard from "./rejected-card";
import ViewApplicationAndOrg from "./view-application-and-org";

interface OrgRow {
  organization: string;
  submitted: string;
  school: string;
  status: string;
  onReviewClick: () => void;
}

interface AccreditCombinedComponentsProps {
  pendingCount: number;
  approvedCount: number;
  needsRevisionCount: number;
  rejectedCount: number;
  onPendingView: () => void;
  onApprovedView: () => void;
  onNeedsRevisionView: () => void;
  onRejectedView: () => void;
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  orgRows: OrgRow[];
}

const responsiveCardWrapper: React.CSSProperties = {
  background: "#f6f7ef",
  borderRadius: 18,
  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  padding: 32,
  maxWidth: 650,
  margin: "32px auto",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export const AccreditCombinedComponents: React.FC<
  AccreditCombinedComponentsProps
> = (props) => {
  const {
    pendingCount,
    approvedCount,
    needsRevisionCount,
    rejectedCount,
    onPendingView,
    onApprovedView,
    onNeedsRevisionView,
    onRejectedView,
    tabs,
    activeTab: parentActiveTab,
    onTabChange: parentOnTabChange,
    orgRows,
  } = props;

  // If parent controls tab, use that; otherwise, manage it locally
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]);
  const activeTab = parentActiveTab ?? internalActiveTab;
  const onTabChange = parentOnTabChange ?? setInternalActiveTab;

  // Custom handlers for each card
  const handlePendingViewClick = useCallback(() => {
    onTabChange("Pending Review");
  }, [onTabChange]);

  const handleApprovedViewClick = useCallback(() => {
    onTabChange("Approved");
  }, [onTabChange]);

  const handleNeedsRevisionViewClick = useCallback(() => {
    onTabChange("Needs Revision");
  }, [onTabChange]);

  const handleRejectedViewClick = useCallback(() => {
    onTabChange("Rejected");
  }, [onTabChange]);

  return (
    <div
      className="accredit-combined-wrapper"
      style={responsiveCardWrapper as React.CSSProperties}
    >
      <div
        className="accredit-card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "180px 180px",
          gridTemplateRows: "auto auto",
          gridTemplateAreas: `
          'pending approved'
          'needs rejected'
        `,
          rowGap: 24,
          columnGap: 94,
          width: "fit-content",
          margin: "0 auto",
          justifyContent: "center",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <div style={{ gridArea: "pending", display: "flex" }}>
          <PendingRevCard
            count={pendingCount}
            onViewClick={handlePendingViewClick}
          />
        </div>
        <div style={{ gridArea: "approved", display: "flex" }}>
          <ApprovedCard
            count={approvedCount}
            onViewClick={handleApprovedViewClick}
          />
        </div>
        <div style={{ gridArea: "needs", display: "flex" }}>
          <NeedsRevisionCard
            count={needsRevisionCount}
            onViewClick={handleNeedsRevisionViewClick}
          />
        </div>
        <div style={{ gridArea: "rejected", display: "flex" }}>
          <RejectedCard
            count={rejectedCount}
            onViewClick={handleRejectedViewClick}
          />
        </div>
      </div>
      <div style={{ width: "100%", overflowX: "auto" }}>
        <ViewApplicationAndOrg
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={onTabChange}
          orgStatusCards={orgRows.map((row) => ({
            organization: row.organization,
            submitted: row.submitted,
            school: row.school,
            status: row.status as import("./org-status-card").OrgStatus,
            onActionClick: row.onReviewClick,
            actionLabel: "Review",
          }))}
        />
      </div>
      <style>{`
        @media (max-width: 640px) {
          .accredit-combined-wrapper {
            padding: 16px !important;
            margin: 16px auto !important;
            gap: 24px !important;
          }
          .accredit-card-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              'pending'
              'approved'
              'needs'
              'rejected' !important;
            row-gap: 16px !important;
            column-gap: 0 !important;
            width: 100% !important;
          }
        }
        .accredit-card-grid > div > div {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default AccreditCombinedComponents;
