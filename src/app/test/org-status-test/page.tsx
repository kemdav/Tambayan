"use client";

import React, { useCallback } from "react";
import OrgStatusCard, {
  OrgStatus,
} from "../../components/ui/general/accreditation-components/org-status-card";

const testData = [
  {
    organization: "Environmental Society",
    submitted: "Oct 12, 2023",
    school: "College of Science",
    status: "Pending" as OrgStatus,
  },
  {
    organization: "Robotics Club",
    submitted: "Oct 15, 2023",
    school: "College of Engineering",
    status: "Approved" as OrgStatus,
  },
  {
    organization: "Art Guild",
    submitted: "Sep 30, 2023",
    school: "College of Arts",
    status: "Revision" as OrgStatus,
  },
  {
    organization: "Chess Club",
    submitted: "Oct 1, 2023",
    school: "College of Science",
    status: "Rejected" as OrgStatus,
  },
];

export default function OrgStatusTestPage() {
  const handleAction = useCallback((org: string, status: OrgStatus) => {
    alert(`${org} (${status}) action clicked!`);
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 24 }}>
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24 }}>
        OrgStatusCard Test
      </h2>
      {testData.map((data, idx) => (
        <OrgStatusCard
          key={idx}
          organization={data.organization}
          submitted={data.submitted}
          school={data.school}
          status={data.status}
          actionLabel="Review"
          onActionClick={() => handleAction(data.organization, data.status)}
        />
      ))}
    </div>
  );
}
