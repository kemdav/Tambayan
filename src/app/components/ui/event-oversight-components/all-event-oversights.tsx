"use client";

import EventOversight from "@/app/components/ui/event-oversight-components/event-oversight-header";
import EventFilter from "@/app/components/ui/event-oversight-components/event-filter";
import EventTable from "./event-table";
import { useState } from "react";
import type { EventData } from "@/lib/actions/event-oversight";

interface Option {
  value: string;
  label: string;
}

interface StatusStyle {
  label: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  nameOversight?: string;
  nameFilter?: string;
  placeholder?: string;
  options?: Option[];
  tableData?: EventData[];
  statuses?: StatusStyle[];
  onClickButton?: () => void;
  onOrgChange?: (orgid: string | null) => void;
  onRemoveEvent?: (event: EventData) => void;
}

export default function AllEventOversights({
  nameOversight = "Event Oversight",
  nameFilter = "Filter by Organization :",
  placeholder = "Select Organization",
  options,
  tableData,
  statuses,
  onClickButton,
  onOrgChange,
  onRemoveEvent,
}: Props) {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const handleView = (event: EventData) => {
    setSelectedEvent(event);
  };

  const handleRemove = () => {
    if (!selectedEvent || !onRemoveEvent) return;
    onRemoveEvent(selectedEvent);
    setSelectedEvent(null);
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 w-full">
      <div className="w-full max-w-[1066px] flex flex-col gap-4">
        <EventOversight name={nameOversight} />
        <EventFilter
          name={nameFilter}
          placeholder={placeholder}
          options={options}
          onClickButton={onClickButton}
          onOrgChange={onOrgChange}
        />
        <EventTable
          tableData={tableData}
          statuses={statuses}
          onRemove={onRemoveEvent}
        />
      </div>
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white border rounded-lg shadow-lg p-6 flex flex-col items-start max-w-[500px] w-full pointer-events-auto">
            <h2 className="text-xl font-bold mb-4">Event Details</h2>
            <div className="mb-2">
              <strong>Event Name:</strong> {selectedEvent.eventName}
            </div>
            <div className="mb-2">
              <strong>Organization:</strong> {selectedEvent.organization}
            </div>
            <div className="mb-2">
              <strong>Date:</strong> {selectedEvent.date}
            </div>
            <div className="mb-2">
              <strong>Location:</strong> {selectedEvent.location}
            </div>
            <div className="mb-2">
              <strong>Status:</strong>{" "}
              {selectedEvent.status === "Upcoming" ? "Upcoming" : "Finished"}
            </div>
            <button
              onClick={handleRemove}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded self-end"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
