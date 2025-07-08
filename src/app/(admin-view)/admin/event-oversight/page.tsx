"use client";

import AllEventOversights from "@/app/components/ui/event-oversight-components/all-event-oversights";
import {
  fetchEvents,
  fetchOrganizationOptions,
  getSampleStatuses,
  type EventData,
  type Option,
  deleteEvent,
} from "@/lib/actions/event-oversight";
import { useEffect, useState } from "react";

export default function EventOversightPage() {
  const [tableData, setTableData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const filteredTableData = selectedOrg
    ? tableData.filter((event) => event.organization === selectedOrg)
    : tableData;

  const handleRemoveEvent = async (eventToRemove: EventData) => {
    await deleteEvent(eventToRemove.eventid);
    setTableData((prev) =>
      prev.filter((e) => e.eventid !== eventToRemove.eventid)
    );
  };

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const events = await fetchEvents();
        setTableData(events);
        const orgOptions = await fetchOrganizationOptions();
        setOptions(orgOptions);
      } catch (error) {
        console.error("Error loading events:", error);
        setTableData([]);
        setOptions([]);
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
          options={options}
          statuses={getSampleStatuses()}
          tableData={filteredTableData}
          onOrgChange={setSelectedOrg}
          onRemoveEvent={handleRemoveEvent}
        />
        {loading && <div className="mt-4 text-gray-500">Loading events...</div>}
      </div>
    </div>
  );
}
