"use client";

import AllEventOversights from "@/app/components/ui/event-oversight-components/all-event-oversights";

const sampleOptions = [
  { value: "cs-society", label: "Computer Science Society" },
  { value: "math-club", label: "Math Club" },
  { value: "debate-club", label: "Debate Club" },
];

const sampleStatuses = [
  { label: "Upcoming", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
  { label: "Ongoing", bgColor: "bg-green-100", textColor: "text-green-800" },
  { label: "Completed", bgColor: "bg-blue-100", textColor: "text-blue-800" },
];

const sampleTableData = [
  {
    eventName: "Tech Symposium 2024",
    organization: "Computer Science Society",
    date: "2024-07-10",
    location: "Auditorium",
    status: "Upcoming",
    onClickView: () => alert("View Tech Symposium 2024"),
    onClickEdit: () => alert("Edit Tech Symposium 2024"),
  },
  {
    eventName: "Math Olympiad",
    organization: "Math Club",
    date: "2024-07-12",
    location: "Room 101",
    status: "Ongoing",
    onClickView: () => alert("View Math Olympiad"),
    onClickEdit: () => alert("Edit Math Olympiad"),
  },
  {
    eventName: "Debate Finals",
    organization: "Debate Club",
    date: "2024-07-15",
    location: "Conference Hall",
    status: "Completed",
    onClickView: () => alert("View Debate Finals"),
    onClickEdit: () => alert("Edit Debate Finals"),
  },
];

export default function EventOversightPage() {
  return (
    <div className="min-h-screen px-4 py-6 bg-gray-50">
      <div className="w-full max-w-[1089px] mx-auto mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-3xl font-bold text-gray-800">
          Event Oversight Page
        </h1>
      </div>
      <div className="w-full max-w-[1089px] mx-auto bg-white border rounded-[10px] shadow-sm p-6">
        <AllEventOversights
          options={sampleOptions}
          statuses={sampleStatuses}
          tableData={sampleTableData}
        />
      </div>
    </div>
  );
}
