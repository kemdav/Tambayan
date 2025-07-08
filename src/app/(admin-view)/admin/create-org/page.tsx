"use client";

import React, { useState } from "react";
import CreateOrgAdminComponents from "@/app/components/ui/general/create-org-admin-components";

export default function CreateOrgPage() {
  const [orgName, setOrgName] = useState("");

  return (
    <CreateOrgAdminComponents
      orgName={orgName}
      onOrgNameChange={(e) => setOrgName(e.target.value)}
      onCancel={() => {
        setOrgName("");
      }}
      onCreate={() => {
        console.log("clicked");
      }}
    />
  );
}
