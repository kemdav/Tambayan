"use client";

import React, { useState, useEffect } from "react";
import CreateOrgAdminComponents from "@/app/components/ui/general/create-org-admin-components";
import {
  fetchStudentsForPresident,
  createOrganization,
} from "@/lib/actions/createorg-admin";

interface MemberCard {
  firstname: string;
  lastname: string;
  course: string;
  yearlvl: string;
  studentid: string;
}

export default function CreateOrgPage() {
  const [orgName, setOrgName] = useState("");
  const [students, setStudents] = useState<MemberCard[]>([]);
  const [assignedStudentId, setAssignedStudentId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function loadStudents() {
      const data = await fetchStudentsForPresident();
      setStudents(data);
    }
    loadStudents();
  }, []);

  return (
    <CreateOrgAdminComponents
      orgName={orgName}
      onOrgNameChange={(e) => setOrgName(e.target.value)}
      onCancel={() => {
        setOrgName("");
        setAssignedStudentId(null);
      }}
      onCreate={async () => {
        const result = await createOrganization(orgName, assignedStudentId);
        if (result.success) {
          alert("Organization created!");
          setOrgName("");
          setAssignedStudentId(null);
        } else {
          alert("Error: " + result.error);
        }
      }}
      students={students}
      assignedStudentId={assignedStudentId}
      setAssignedStudentId={setAssignedStudentId}
    />
  );
}
