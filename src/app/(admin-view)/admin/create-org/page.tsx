"use client";

import React, { useState } from "react";
import CreateOrgAdminComponents from "@/app/components/ui/general/create-org-admin-components";

const ORG_TYPE_OPTIONS = [
  { value: "academic", label: "Academic" },
  { value: "sports", label: "Sports" },
  { value: "arts", label: "Arts" },
  { value: "interest", label: "Interest Group" },
];

export default function CreateOrgPage() {
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [description, setDescription] = useState("");

  return (
    <CreateOrgAdminComponents
      orgName={orgName}
      onOrgNameChange={(e) => setOrgName(e.target.value)}
      orgType={orgType}
      orgTypeOptions={ORG_TYPE_OPTIONS}
      onOrgTypeChange={setOrgType}
      description={description}
      onDescriptionChange={(e) => setDescription(e.target.value)}
      onCancel={() => {
        setOrgName("");
        setOrgType("");
        setDescription("");
      }}
      onCreate={() => {
        console.log("clicked");
      }}
    />
  );
}
