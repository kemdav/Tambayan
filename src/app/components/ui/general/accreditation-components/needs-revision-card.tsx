import React from "react";

interface NeedsRevisionCardProps {
  count: number;
  onViewClick: () => void;
}

export const NeedsRevisionCard: React.FC<NeedsRevisionCardProps> = ({ count, onViewClick }) => (
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
      <span style={{ fontWeight: 600, color: "#5b6652", fontSize: 18 }}>Needs Revision</span>
      <span style={{ color: "#5b6652", fontSize: 20 }} title="Needs Revision">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" fill="#5b6652" fillOpacity="0.15"/><path d="M8 8h8v8H8V8z" stroke="#5b6652" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 9l-6 6" stroke="#5b6652" strokeWidth="1.5" strokeLinecap="round"/></svg>
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

export default NeedsRevisionCard; 