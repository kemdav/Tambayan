import FirstHeader from "./first-header";
import SecondHeader from "./second-header"; /* Prop : timeperiods [label,value], filters[label,value] */
import ActiveOrganization from "./active-organization"; /* Prop : isValueUp [boolean], currentPercent [number], lastPeriodPercent [number] */
import StudentEngagement from "./student-engagement"; /* Prop : isValueUp [boolean], currentPercent [number], lastPeriodPercent [number] */
import TotalEvents from "./total-events"; /* Prop : isValueUp [boolean], currentPercent [number], lastPeriodPercent [number] */
import OrganizationActivity from "./organization-activity"; /* Prop : data [{posts, events}] */
import EngagementBySchool from "./engagement-by-school"; /* Prop : data [{date, engineering, arts, science}] */
import TopPerformingOrganizations from "./top-performing-organization"; /* Prop : organizations [{name, engagement, events}] */
import EventEngagementMetrics from "./event-engagement-metrics"; /* Prop : mostAttendedEvent, highestEngagementOrg, averageFeedbackScore [number] */

export default function Analytics() {
  const topOrganizations = [
    { name: "Computer Science Society", engagement: 89, events: 12 },
    { name: "Debate Club", engagement: 85, events: 8 },
    { name: "Student Council", engagement: 82, events: 24 },
    { name: "Photography Club", engagement: 78, events: 6 },
    { name: "Math League", engagement: 95, events: 10 },
  ];

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

  return (
    <div className="p-4 max-w-full">
      <FirstHeader />
      <SecondHeader />

      <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
        <ActiveOrganization />
        <StudentEngagement />
        <TotalEvents />
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between mt-4">
        <OrganizationActivity data={orgData} />
        <EngagementBySchool data={eventData} />
      </div>

      <div className="mt-4">
        <TopPerformingOrganizations organizations={topOrganizations} />
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
