"use client";

import Analytics from "@/app/components/ui/general/analytics-components/analytics";

export default function AnalyticsTest() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-6 bg-gray-50">
      <div className="w-full max-w-[1089px] bg-white p-4 border rounded-[10px] shadow-sm">
        <Analytics />
      </div>
    </div>
  );
}
