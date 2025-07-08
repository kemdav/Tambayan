"use client";

import { useEffect, useState } from "react";
import {
  getTotalEvents,
  getOrgActivityForUniversity,
  getStudentEngagement,
  getOrgStatsByUniversity,
  getTopPerformingOrgs,
  getEventEngagementMetrics,
  getAllUniversities,
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
  const [schoolOptions, setSchoolOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("this_week");
  const [selectedSchool, setSelectedSchool] = useState("");
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
    async function loadUniversities() {
      const options = await getAllUniversities();
      setSchoolOptions(options);
      if (options.length > 0) {
        setSelectedSchool(options[0].value); // auto-select first university
      }
    }

    loadUniversities();
  }, []);

  useEffect(() => {
    if (!selectedSchool) return;

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
