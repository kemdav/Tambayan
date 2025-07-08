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
} from "@/lib/actions/analytics";

const schoolOptions = [
  { label: "Cebu Institute of Technology", value: "u1" },
  { label: "Cebu Technological University", value: "u2" },
  { label: "University of Cebu", value: "u3" },
];

export default function Analytics() {
  const [selectedSchool, setSelectedSchool] = useState("u1");
  const [totalEvents, setTotalEvents] = useState(0);
  const [orgStats, setOrgStats] = useState({ total: 0, active: 0 });
  const [studentEngagement, setStudentEngagement] = useState(0);
  const [orgActivity, setOrgActivity] = useState<
    { date: string; events: number; posts: number }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const [events, orgs, engagement, activity] = await Promise.all([
        getTotalEvents(selectedSchool),
        getOrgStatsByUniversity(selectedSchool),
        getStudentEngagement(selectedSchool),
        getOrgActivityForUniversity(selectedSchool),
      ]);

      setTotalEvents(events);
      setOrgStats(orgs);
      setStudentEngagement(engagement);
      setOrgActivity(activity);
    };

    load();
  }, [selectedSchool]);

  return (
    <div className="p-4 max-w-full">
      <FirstHeader />
      <SecondHeader
        filters={schoolOptions}
        onFilterChange={(value) => setSelectedSchool(value)}
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
        <TopPerformingOrganizations
          organizations={[
            { name: "Computer Science Society", engagement: 89, events: 12 },
            { name: "Debate Club", engagement: 85, events: 8 },
            { name: "Student Council", engagement: 82, events: 24 },
            { name: "Photography Club", engagement: 78, events: 6 },
            { name: "Math League", engagement: 95, events: 10 },
          ]}
        />
      </div>

      <div className="mt-4">
        <EventEngagementMetrics
          mostAttendedEvent="Tech Fest 2023"
          highestEngagementOrg="Computer Science Society"
          averageFeedbackScore="4.5"
        />
      </div>
    </div>
  );
}
