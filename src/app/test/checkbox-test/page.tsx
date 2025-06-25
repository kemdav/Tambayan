"use client";

import React, { useState } from "react";
import CheckboxComponent from "../../components/ui/checkbox-component";

const CheckboxTestPage = () => {
  const [allStudents, setAllStudents] = useState(false);
  const [specificOrgs, setSpecificOrgs] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <CheckboxComponent
        text={<span style={{ color: 'var(action-light-blue)' }}>All Students</span>}
        checked={allStudents}
        onChange={e => setAllStudents(e.target.checked)}    
      />
      <CheckboxComponent
        text={"Specific\nOrganizations"}
        checked={specificOrgs}
        onChange={e => setSpecificOrgs(e.target.checked)}
      />
    </div>
  );
};

export default CheckboxTestPage; 