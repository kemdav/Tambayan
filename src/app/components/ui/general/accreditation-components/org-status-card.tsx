import React from "react";

export type OrgStatus = "Approved" | "Revision" | "Pending" | "Rejected";

interface OrgStatusCardProps {
  organization: string;
  submitted: string;
  school: string;
  status: OrgStatus;
  onActionClick: () => void;
  actionLabel: string;
}

const statusStyles: Record<OrgStatus, React.CSSProperties> = {
  Approved: {
    background: "#e6f4ea",
    color: "#355c3a",
  },
  Revision: {
    background: "#e6f0fa",
    color: "#2563eb",
  },
  Pending: {
    background: "#f8f3d9",
    color: "#bfae5a",
  },
  Rejected: {
    background: "#fbeaea",
    color: "#a94442",
  },
};

const cardBackgrounds: Record<OrgStatus, string> = {
  Approved: "#f6fffa",
  Revision: "#f5f8ff",
  Pending: "#fffbe6",
  Rejected: "#fff6f6",
};

export const OrgStatusCard: React.FC<OrgStatusCardProps> = ({
  organization,
  submitted,
  school,
  status,
  onActionClick,
  actionLabel,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        background: cardBackgrounds[status],
        borderRadius: 10,
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        padding: "8px 8px",
        marginBottom: 4,
        width: "100%",
        fontFamily: "inherit",
        gap: 2,
        minWidth: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "2 1 140px",
          fontWeight: 600,
          color: "#495c4c",
          minWidth: 100,
          fontSize: 13,
          wordBreak: "break-word",
        }}
      >
        {organization}
      </div>
      <div
        style={{
          flex: "1 1 80px",
          color: "#495c4c",
          minWidth: 80,
          textAlign: "center",
          fontSize: 12,
          wordBreak: "break-word",
        }}
      >
        {submitted}
      </div>
      <div
        style={{
          flex: "2 1 140px",
          color: "#495c4c",
          minWidth: 100,
          textAlign: "center",
          fontSize: 12,
          wordBreak: "break-word",
        }}
      >
        {school}
      </div>
      <div
        style={{
          flex: "1 1 100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          minWidth: 70,
        }}
      >
        <span
          style={{
            ...statusStyles[status],
            borderRadius: 7,
            padding: "2px 10px",
            fontWeight: 700,
            fontSize: 12,
            minWidth: 45,
            textAlign: "center",
            display: "inline-block",
            wordBreak: "break-word",
          }}
        >
          {status}
        </span>
      </div>
      <div
        style={{
          flex: "1 1 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 60,
        }}
      >
        <button
          onClick={onActionClick}
          style={{
            background: "#7b8a7d",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "4px 10px",
            fontWeight: 600,
            fontSize: 12,
            cursor: "pointer",
            boxShadow: "0 1px 2px rgba(0,0,0,0.07)",
            whiteSpace: "nowrap",
          }}
        >
          {actionLabel}
        </button>
      </div>
      <style>{`
        @media (max-width: 700px) {
          div[role='org-status-card'] {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 2px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrgStatusCard;
