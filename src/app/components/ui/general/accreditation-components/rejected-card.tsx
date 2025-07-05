import React from "react";

interface RejectedCardProps {
  count: number;
  onViewClick: () => void;
}

export const RejectedCard: React.FC<RejectedCardProps> = ({ count, onViewClick }) => (
  <div
    style={{
      background: "#f6f7ef",
      borderRadius: 12,
      padding: 18,
      width: 260,
      minHeight: 110,
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontWeight: 600, color: "#5b6652", fontSize: 18 }}>Rejected</span>
      <span style={{ color: "#a94442", fontSize: 20 }} title="Rejected">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#a94442" fillOpacity="0.15"/><path d="M15 9l-6 6M9 9l6 6" stroke="#a94442" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </span>
    </div>
    <div style={{ fontWeight: 700, fontSize: 32, color: "#222", margin: "8px 0 0 0" }}>{count}</div>
    <button
      onClick={onViewClick}
      style={{
        background: "none",
        border: "none",
        color: "#7b8a7d",
        textDecoration: "underline",
        cursor: "pointer",
        fontSize: 16,
        marginTop: 4,
        padding: 0,
        textAlign: "left",
        width: "fit-content",
      }}
    >
      View Applications
    </button>
  </div>
);

export default RejectedCard; 