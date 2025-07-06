"use client";

import AllEventOversights from "@/app/components/ui/event-oversight-components/all-event-oversights";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// Define the EventData type to match the tableData structure
interface EventData {
  eventName: string;
  organization: string;
  date: string;
  location: string;
  status?: string;
  onClickView: () => void;
  onClickEdit: () => void;
}

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

export default function EventOversightPage() {
  const [tableData, setTableData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("events")
        .select("eventid, title, orgid, date, location, status");
      if (error) {
        console.error("Error fetching events:", error);
        setTableData([]);
        setLoading(false);
        return;
      }
      // Map events to tableData format
      const mapped: EventData[] = (data || []).map((event) => ({
        eventName: event.title || "Untitled Event",
        organization: event.orgid || "Unknown Org",
        date: event.date ? new Date(event.date).toLocaleDateString() : "-",
        location: event.location || "-",
        status: event.status || "-",
        onClickView: () => alert(`View ${event.title}`),
        onClickEdit: () => alert(`Edit ${event.title}`),
      }));
      setTableData(mapped);
      setLoading(false);
    };
    fetchEvents();
  }, []);

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
          tableData={tableData}
        />
        {loading && <div className="mt-4 text-gray-500">Loading events...</div>}
      </div>
    </div>
  );
}
