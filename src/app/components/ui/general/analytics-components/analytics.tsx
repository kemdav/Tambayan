"use client";

import { useEffect, useState } from "react";
import FirstHeader from "./first-header";
import SecondHeader from "./second-header";
import ActiveOrganization from "./active-organization";
import StudentEngagement from "./student-engagement";
import TotalEvents from "./total-events";
import OrganizationActivity from "./organization-activity";
import EngagementBySchool from "./engagement-by-school";
import TopPerformingOrganizations from "./top-performing-organization";
import EventEngagementMetrics from "./event-engagement-metrics";
import {
  getTotalEvents,
  getOrgActivityForUniversity,
  getStudentEngagement,
  getOrgStatsByUniversity,
  getTopPerformingOrgs,
  type Organization,
  getEventEngagementMetrics,
} from "@/lib/actions/analytics";

const schoolOptions = [
  { label: "Cebu Institute of Technology", value: "u1" },
  { label: "Cebu Technological University", value: "u2" },
  { label: "University of Cebu", value: "u3" },
];

const timePeriodOptions = [
  { label: "This Week", value: "this_week" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Last Year", value: "last_year" },
];

export default function Analytics() {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("this_week");
  const [selectedSchool, setSelectedSchool] = useState("u1");
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
    mostAttendedEvent: "Loading...",
    highestEngagementOrg: "Loading...",
    averageFeedbackScore: "0",
  });

  useEffect(() => {
    const load = async () => {
      const [events, orgs, engagement, activity, topOrgs, metrics] =
        await Promise.all([
          getTotalEvents(selectedSchool),
          getOrgStatsByUniversity(selectedSchool),
          getStudentEngagement(selectedSchool),
          getOrgActivityForUniversity(selectedSchool, selectedTimePeriod),
          getTopPerformingOrgs(selectedSchool),
          getEventEngagementMetrics(selectedSchool),
        ]);

      setTotalEvents(events);
      setOrgStats(orgs);
      setStudentEngagement(engagement);
      setOrgActivity(activity);
      setTopPerformingOrgs(topOrgs);
      setEventMetrics(metrics);
    };

    load();
  }, [selectedSchool, selectedTimePeriod]);

  return (
    <div className="p-4 max-w-full">
      <FirstHeader />
      <SecondHeader
        timeperiods={timePeriodOptions}
        filters={schoolOptions}
        onFilterChange={(value) => setSelectedSchool(value)}
        onTimePeriodChange={(value) => setSelectedTimePeriod(value)} // 👈 Add this
      />

      <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
        <ActiveOrganization
          totalOrg={orgStats.total}
          currentActive={orgStats.active}
        />
        <StudentEngagement currentPercent={studentEngagement} />
        <TotalEvents currentPercent={totalEvents} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
        <OrganizationActivity data={orgActivity} />

        <EngagementBySchool
          data={[
            { date: "Jul 1", engineering: 10, arts: 5, science: 3 },
            { date: "Jul 2", engineering: 15, arts: 8, science: 4 },
            { date: "Jul 3", engineering: 12, arts: 6, science: 2 },
            { date: "Jul 4", engineering: 20, arts: 12, science: 5 },
            { date: "Jul 5", engineering: 18, arts: 10, science: 6 },
          ]}
        />
      </div>

      <div className="mt-4">
        <TopPerformingOrganizations organizations={topPerformingOrgs} />
      </div>

      <div className="mt-4">
        <EventEngagementMetrics
          mostAttendedEvent={eventMetrics.mostAttendedEvent}
          highestEngagementOrg={eventMetrics.highestEngagementOrg}
          averageFeedbackScore={eventMetrics.averageFeedbackScore}
        />
      </div>
    </div>
  );
}
