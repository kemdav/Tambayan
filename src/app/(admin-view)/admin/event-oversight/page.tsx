"use client";

import AllEventOversights from "@/app/components/ui/event-oversight-components/all-event-oversights";
import {
  fetchEvents,
  getSampleOptions,
  getSampleStatuses,
  type EventData,
} from "@/lib/actions/event-oversight";
import { useEffect, useState } from "react";

export default function EventOversightPage() {
  const [tableData, setTableData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const events = await fetchEvents();
        setTableData(events);
      } catch (error) {
        console.error("Error loading events:", error);
        setTableData([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
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
          options={getSampleOptions()}
          statuses={getSampleStatuses()}
          tableData={tableData}
        />
        {loading && <div className="mt-4 text-gray-500">Loading events...</div>}
      </div>
    </div>
  );
}
