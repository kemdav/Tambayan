"use client";

import WikiPageComponent from "@/app/components/ui/general/wikipage-component";

export default function WikiPageTest() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <WikiPageComponent
        title="Edit Wiki"
        cancelText="Cancel"
        saveText="Save"
        onCancel={() => console.log("Cancelled")}
        onSave={() => console.log("Saved")}
        onClose={() => console.log("Closed")}
      />
    </div>
  );
}
