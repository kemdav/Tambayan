"use client";

import React, { useState } from "react";
import CheckboxComponent from "../../components/ui/checkbox-component";

const CheckboxTestPage = () => {
  const [allStudents, setAllStudents] = useState(false);
  const [specificOrgs, setSpecificOrgs] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <CheckboxComponent
        text="All Students"
        checked={allStudents}
        onChange={setAllStudents}
      />
      <CheckboxComponent
        text={"Specific\nOrganizations"}
        checked={specificOrgs}
        onChange={setSpecificOrgs}
      />
    </div>
  );
};

export default CheckboxTestPage; 