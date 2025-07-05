import React from "react";
import OrgStatusCard, { OrgStatus } from "./org-status-card";

export interface OrgStatusCardData {
  organization: string;
  submitted: string;
  school: string;
  status: OrgStatus;
  onActionClick: () => void;
  actionLabel: string;
}

interface ViewApplicationAndOrgProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  orgStatusCards: OrgStatusCardData[];
}

// Map tab names to OrgStatus
const tabToStatus: Record<string, OrgStatus | null> = {
  "Pending Review": "Pending",
  Approved: "Approved",
  "Needs Revision": "Revision",
  Rejected: "Rejected",
  "New Accreditation": null, // or handle as needed
};

export const ViewApplicationAndOrg: React.FC<ViewApplicationAndOrgProps> = ({
  tabs,
  activeTab,
  onTabChange,
  orgStatusCards,
}) => {
  // Sample data for each tab - you can replace this with actual props
  const sampleOrgStatusCards: OrgStatusCardData[] = [
    // Pending Review tab data
    {
      organization: "Computer Science Society",
      submitted: "2024-01-15",
      school: "School of Engineering",
      status: "Pending",
      onActionClick: () => console.log("Review Computer Science Society"),
      actionLabel: "Review",
    },
    {
      organization: "Art and Design Collective",
      submitted: "2024-01-11",
      school: "School of Arts",
      status: "Pending",
      onActionClick: () => console.log("Review Art Collective"),
      actionLabel: "Review",
    },
    {
      organization: "Literary Society",
      submitted: "2024-01-08",
      school: "School of Humanities",
      status: "Pending",
      onActionClick: () => console.log("Review Literary Society"),
      actionLabel: "Review",
    },
    // Approved tab data
    {
      organization: "Mathematics Club",
      submitted: "2024-01-14",
      school: "School of Science",
      status: "Approved",
      onActionClick: () => console.log("View Mathematics Club"),
      actionLabel: "View",
    },
    {
      organization: "International Students Union",
      submitted: "2024-01-10",
      school: "School of International Relations",
      status: "Approved",
      onActionClick: () => console.log("View International Union"),
      actionLabel: "View",
    },
    // Needs Revision tab data
    {
      organization: "Environmental Awareness Group",
      submitted: "2024-01-13",
      school: "School of Environmental Studies",
      status: "Revision",
      onActionClick: () => console.log("Review Environmental Group"),
      actionLabel: "Review",
    },
    {
      organization: "Sports and Recreation Club",
      submitted: "2024-01-09",
      school: "School of Physical Education",
      status: "Revision",
      onActionClick: () => console.log("Review Sports Club"),
      actionLabel: "Review",
    },
    // Rejected tab data
    {
      organization: "Business Students Association",
      submitted: "2024-01-12",
      school: "School of Business",
      status: "Rejected",
      onActionClick: () => console.log("View Business Association"),
      actionLabel: "View",
    },
    {
      organization: "Photography Club",
      submitted: "2024-01-07",
      school: "School of Media Arts",
      status: "Rejected",
      onActionClick: () => console.log("View Photography Club"),
      actionLabel: "View",
    },
  ];

  // Use sample data if no orgStatusCards provided, otherwise use the passed props
  const cardsToUse =
    orgStatusCards.length > 0 ? orgStatusCards : sampleOrgStatusCards;

  // Determine which status to show based on tab
  const statusToShow = tabToStatus[activeTab];
  const filteredCards = statusToShow
    ? cardsToUse.filter((card) => card.status === statusToShow)
    : cardsToUse;

  return (
    <div
      style={{
        background: "#f6f7ef",
        borderRadius: 12,
        padding: 0,
        width: 560,
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 24,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "18px 18px 0 18px" }}>
        <div
          style={{
            display: "flex",
            gap: 24,
            borderBottom: "2px solid #e0e4d8",
            marginBottom: 0,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                background: "none",
                border: "none",
                fontWeight: activeTab === tab ? 700 : 500,
                color: "#495c4c",
                fontSize: 18,
                padding: "6px 0",
                borderBottom:
                  activeTab === tab
                    ? "3px solid #7b8a7d"
                    : "3px solid transparent",
                cursor: "pointer",
                outline: "none",
                marginBottom: -2,
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 18px 18px 18px" }}>
        {/* Header Row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "#f3f4ed",
            borderRadius: 8,
            fontWeight: 700,
            color: "#495c4c",
            fontSize: 15,
            padding: "8px 16px",
            marginBottom: 6,
            minWidth: 0,
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <div style={{ flex: "2 1 140px", minWidth: 100 }}>Organization</div>
          <div style={{ flex: "1 1 80px", minWidth: 80, textAlign: "center" }}>
            Date
          </div>
          <div
            style={{ flex: "2 1 140px", minWidth: 100, textAlign: "center" }}
          >
            School
          </div>
          <div style={{ flex: "1 1 100px", minWidth: 70, textAlign: "center" }}>
            Status
          </div>
          <div style={{ flex: "1 1 80px", minWidth: 60, textAlign: "center" }}>
            Actions
          </div>
        </div>
        <div
          style={{
            width: "100%",
            maxHeight: 400,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {filteredCards.length === 0 ? (
            <div
              style={{ color: "#7b8a7d", textAlign: "center", marginTop: 32 }}
            >
              No organizations found for this tab.
            </div>
          ) : (
            filteredCards.map((card, idx) => (
              <div key={idx} style={{ width: "100%" }}>
                <OrgStatusCard {...card} />
              </div>
            ))
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .accredit-card-list-scrollable, .accredit-header-row {
            padding: 0 4px 12px 4px !important;
          }
          .accredit-header-row > div, .accredit-card-list-scrollable > div {
            min-width: 60px !important;
            font-size: 13px !important;
          }
        }
        @media (max-width: 600px) {
          .accredit-header-row {
            font-size: 12px !important;
            padding: 4px 4px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewApplicationAndOrg;
