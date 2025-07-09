"use client";

import React, { useEffect, useState } from "react";
import PendingBroadcast from "./pending-broadcast";
import ActiveOrganization from "@/app/components/ui/general/analytics-components/active-organization";
import StudentEngagement from "@/app/components/ui/general/analytics-components/student-engagement";
import TotalEvents from "@/app/components/ui/general/analytics-components/total-events";
import OrganizationActivity from "@/app/components/ui/general/analytics-components/organization-activity";
import ViewApplicationAndOrg from "@/app/components/ui/general/accreditation-components/view-application-and-org";

import {
  getOrgActivity,
  getOrgStats,
  getStudentEngagement,
  getTotalEvents,
} from "@/lib/actions/analytics";

export default function DashboardCombined() {
  const [orgData, setOrgData] = useState<
    { date: string; posts: number; events: number }[]
  >([]);
  const [orgStats, setOrgStats] = useState({ total: 0, active: 0 });
  const [studentEngagement, setStudentEngagement] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const [activity, stats, engagement, total] = await Promise.all([
        getOrgActivity("this_month"), // ✅ Org activity this month
        getOrgStats(),
        getStudentEngagement("this_month"), // ✅ Student engagement this month only
        getTotalEvents(),
      ]);

      setOrgData(activity);
      setOrgStats(stats);
      setStudentEngagement(engagement);
      setTotalEvents(total);
    }

    fetchData();
  }, []);

  const tabs = ["Pending Review", "Approved", "Needs Revision", "Rejected"];
  const [activeTab, setActiveTab] = useState("Pending Review");

  return (
    <div className="w-full max-w-[1089px] mx-auto">
      <div className="border rounded-lg p-6 shadow-sm">
        {/* Metrics Row */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <ActiveOrganization
            totalOrg={orgStats.total}
            currentActive={orgStats.active}
          />
          <StudentEngagement currentPercent={studentEngagement} />
          <TotalEvents currentPercent={totalEvents} />
          <PendingBroadcast count={3} />
        </div>

        {/* Charts Row */}
        <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-8">
          <OrganizationActivity title="(This Month)" data={orgData} />
        </div>

        {/* View Application Section */}
        <div className="mt-8">
          <ViewApplicationAndOrg
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            orgStatusCards={[]}
          />
        </div>
      </div>
    </div>
  );
}
