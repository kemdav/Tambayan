"use client";

import React from "react";
import PendingBroadcast from "./pending-broadcast";
import ActiveOrganization from "@/app/components/ui/general/analytics-components/active-organization";
import StudentEngagement from "@/app/components/ui/general/analytics-components/student-engagement";
import TotalEvents from "@/app/components/ui/general/analytics-components/total-events";
import OrganizationActivity from "@/app/components/ui/general/analytics-components/organization-activity";
import EngagementBySchool from "@/app/components/ui/general/analytics-components/engagement-by-school";
import ViewApplicationAndOrg from "@/app/components/ui/general/accreditation-components/view-application-and-org";

export default function DashboardCombined() {
  const eventData = [
    { date: "Jul 1", engineering: 10, arts: 5, science: 3 },
    { date: "Jul 2", engineering: 15, arts: 8, science: 4 },
    { date: "Jul 3", engineering: 12, arts: 6, science: 2 },
    { date: "Jul 4", engineering: 20, arts: 12, science: 5 },
    { date: "Jul 5", engineering: 18, arts: 10, science: 6 },
  ];

  const orgData = [
    { date: "Jul 1", posts: 10, events: 5 },
    { date: "Jul 2", posts: 15, events: 8 },
    { date: "Jul 3", posts: 12, events: 6 },
    { date: "Jul 4", posts: 20, events: 12 },
    { date: "Jul 5", posts: 18, events: 10 },
  ];

  // Sample data for ViewApplicationAndOrg
  const tabs = ["Pending Review", "Approved", "Needs Revision", "Rejected"];
  const [activeTab, setActiveTab] = React.useState("Pending Review");

  return (
    <div className="w-full max-w-[1089px] mx-auto">
      <div className="border rounded-lg p-6 shadow-sm">
        {/* Metrics Row */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <ActiveOrganization />
          <StudentEngagement />
          <TotalEvents />
          <PendingBroadcast count={3} />
        </div>

        {/* Charts Row */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-8">
          <OrganizationActivity data={orgData} />
          <EngagementBySchool data={eventData} />
        </div>

        {/* View Application Section */}
        <div className="mt-8">
          <div className="w-full">
            <ViewApplicationAndOrg
              tabs={tabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              orgStatusCards={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
