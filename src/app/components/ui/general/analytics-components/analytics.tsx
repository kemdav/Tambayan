"use client";

import { useEffect, useState } from "react";
import {
  getTotalEvents,
  getOrgStats,
  getStudentEngagement,
  getOrgActivity,
  getTopOrgs,
  getEventEngagementMetrics,
  type Organization,
} from "@/lib/actions/analytics";

import FirstHeader from "./first-header";
import SecondHeader from "./second-header";
import ActiveOrganization from "./active-organization";
import StudentEngagement from "./student-engagement";
import TotalEvents from "./total-events";
import OrganizationActivity from "./organization-activity";
import TopPerformingOrganizations from "./top-performing-organization";
import EventEngagementMetrics from "./event-engagement-metrics";

const timePeriodOptions = [
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Last Year", value: "last_year" },
];

export default function Analytics() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("this_week");
  const [totalEvents, setTotalEvents] = useState(0);
  const [orgStats, setOrgStats] = useState({ total: 0, active: 0 });
  const [studentEngagement, setStudentEngagement] = useState(0);
  const [orgActivity, setOrgActivity] = useState<
    { date: string; events: number; posts: number }[]
  >([]);
  const [topPerformingOrgs, setTopPerformingOrgs] = useState<Organization[]>(
    []
  );
  const [eventMetrics, setEventMetrics] = useState({
    avgComments: "0",
    avgLikes: "0",
    avgRegistrations: "0",
  });

  useEffect(() => {
    async function loadAnalytics() {
      const [events, orgs, engagement, activity, topOrgs, engagementData] =
        await Promise.all([
          getTotalEvents(),
          getOrgStats(),
          getStudentEngagement(selectedTimePeriod),
          getOrgActivity(selectedTimePeriod),
          getTopOrgs(),
          getEventEngagementMetrics(),
        ]);

      setTotalEvents(events);
      setOrgStats(orgs);
      setStudentEngagement(engagement);
      setOrgActivity(activity);
      setTopPerformingOrgs(topOrgs);
      setEventMetrics(engagementData);
    }

    loadAnalytics();
  }, [selectedTimePeriod]);

  return (
    <div className="p-4 max-w-full">
      <FirstHeader />
      <SecondHeader
        timeperiods={timePeriodOptions}
        onTimePeriodChange={(value) => setSelectedTimePeriod(value)}
      />

      <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
        <ActiveOrganization
          totalOrg={orgStats.total}
          currentActive={orgStats.active}
        />
        <StudentEngagement currentPercent={studentEngagement} />
        <TotalEvents currentPercent={totalEvents} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-center mt-4">
        <OrganizationActivity data={orgActivity} />
      </div>

      <div className="mt-4">
        <TopPerformingOrganizations organizations={topPerformingOrgs} />
        <EventEngagementMetrics
          avgComments={eventMetrics.avgComments}
          avgLikes={eventMetrics.avgLikes}
          avgRegistrations={eventMetrics.avgRegistrations}
        />
      </div>
    </div>
  );
}
