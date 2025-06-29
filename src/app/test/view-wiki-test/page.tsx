"use client";

import React from "react";
import WikiViewComponent from "@/app/components/ui/general/view-wiki";
import { FaInfoCircle } from "react-icons/fa";

export default function WikiPage() {
  const handleBack = () => {
    console.log("Back button clicked");
  };

  const description = `
### Introduction to ICpEP

* Provide a brief overview of the Institute of Computer Engineers of the Philippines (ICpEP).
* Highlight the club's mission, vision, and the significance of being part of a community focused on computer engineering.

### Membership Fees

* Specify any membership fees (if applicable) and the payment methods accepted (e.g., GCASH, onsite).
* Explain what the fees cover, such as workshops, events, and materials.

### Engagement and Participation

* Encourage new members to actively participate in club meetings, workshops, and events.
* Emphasize the importance of collaboration and sharing ideas within the club.

### Contact Information

* Provide contact details for the club president or membership officer for any inquiries regarding the joining process.

### Steps to Join ICpEP

* **Eligibility Criteria:**
    * Must be a student in a computer engineering program or related field.
    * Open to all students interested in computer engineering.
* **Application Process:**
    * Visit the official ICpEP page on the Tambayan platform.
    * Click the "Subscribe" button to express your interest in joining.
`;

  return (
    <WikiViewComponent
      title="How to Join"
      icon={<FaInfoCircle className="text-green-700" />}
      description={description}
      onBack={handleBack}
    />
  );
}
