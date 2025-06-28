"use client";

import ShowcaseCard from "@/app/components/ui/general/showcase-card-component";
("@/app/components/ui/general/org-card");

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <ShowcaseCard
        title="Computer Science Society"
        subtitle="College of Engineering"
        bgColor="bg-blue-500"
        tagText="Active"
        tagBgColor="bg-green-100"
        tagTextColor="text-green-800"
        memberCount={245}
        eventCount={12}
        buttons={[
          {
            label: "View",
            bgColor: "bg-blue-500",
            textColor: "text-white",
            onClick: () => void 0,
          },
        ]}
      />
    </main>
  );
}
