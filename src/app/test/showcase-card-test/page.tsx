"use client";

import ShowcaseCard from "@/app/components/ui/general/showcase-card-component";
("@/app/components/ui/general/org-card");

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <ShowcaseCard
        title="Computer Science Society"
        subtitle="College of Engineering"
        bgColor="bg-[#B7C9A8]"
        tagText="Active"
        tagBgColor="bg-[#E6F2DF]"
        tagTextColor="text-[#4B5D3A]"
        memberCount={245}
        eventCount={12}
        avatarUrl="/kemdavid.png"
        buttons={[
          {
            label: "View",
            bgColor: "bg-[#7B9272]",
            textColor: "text-white",
            onClick: () => void 0,
          },
        ]}
      />
    </main>
  );
}
