import React from "react";

interface OrgRow {
  organization: string;
  submitted: string;
  school: string;
  status: string;
  onReviewClick: () => void;
}

interface ViewApplicationAndOrgProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  orgRows: OrgRow[];
}

export const ViewApplicationAndOrg: React.FC<ViewApplicationAndOrgProps> = ({
  tabs,
  activeTab,
  onTabChange,
  orgRows,
}) => (
  <div
    style={{
      background: '#f6f7ef',
      borderRadius: 12,
      padding: 0,
      width: 560,
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 24,
      overflow: 'hidden',
    }}
  >
    <div style={{ padding: '18px 18px 0 18px' }}>
      <div style={{ display: 'flex', gap: 24, borderBottom: '2px solid #e0e4d8', marginBottom: 0 }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              background: 'none',
              border: 'none',
              fontWeight: activeTab === tab ? 700 : 500,
              color: '#495c4c',
              fontSize: 18,
              padding: '6px 0',
              borderBottom: activeTab === tab ? '3px solid #7b8a7d' : '3px solid transparent',
              cursor: 'pointer',
              outline: 'none',
              marginBottom: -2,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
    <div style={{ padding: '0 18px 18px 18px' }}>
      <table style={{ width: '100%', background: '#fff', borderRadius: 8, borderCollapse: 'separate', borderSpacing: 0, marginTop: 16 }}>
        <thead>
          <tr style={{ color: '#7b8a7d', fontWeight: 700, fontSize: 16, background: '#fff' }}>
            <th style={{ textAlign: 'left', padding: '12px 10px' }}>Organization</th>
            <th style={{ textAlign: 'left', padding: '12px 10px' }}>Submitted</th>
            <th style={{ textAlign: 'left', padding: '12px 10px' }}>School</th>
            <th style={{ textAlign: 'left', padding: '12px 10px' }}>Status</th>
            <th style={{ textAlign: 'left', padding: '12px 10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orgRows.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #e0e4d8', fontSize: 16 }}>
              <td style={{ padding: '12px 10px', color: '#495c4c', fontWeight: 700 }}>{row.organization}</td>
              <td style={{ padding: '12px 10px', color: '#495c4c' }}>{row.submitted}</td>
              <td style={{ padding: '12px 10px', color: '#495c4c' }}>{row.school}</td>
              <td style={{ padding: '12px 10px' }}>
                <span style={{ background: '#f8f3d9', color: '#bfae5a', borderRadius: 8, padding: '4px 12px', fontWeight: 700, fontSize: 14 }}>
                  {row.status}
                </span>
              </td>
              <td style={{ padding: '12px 10px' }}>
                <button
                  onClick={row.onReviewClick}
                  style={{
                    background: '#7b8a7d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '7px 18px',
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.07)',
                  }}
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ViewApplicationAndOrg; 