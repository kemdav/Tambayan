"use client";

import EventOversight from "@/app/components/ui/event-oversight-components/event-oversight-header";
import EventFilter from "@/app/components/ui/event-oversight-components/event-filter";
import EventTable from "./event-table";

interface Data {
  eventName: string;
  organization: string;
  date: string;
  location: string;
  status?: string;
  onClickView: () => void;
  onClickEdit: () => void;
}

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
  tableData?: Data[];
  statuses?: StatusStyle[];
  onClickButton?: () => void;
}

export default function AllEventOversights({
  nameOversight = "Event Oversight",
  nameFilter = "Filter by Organization :",
  placeholder = "Select Organization",
  options,
  tableData,
  statuses,
  onClickButton,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-4 w-full">
      <div className="w-full max-w-[1066px] flex flex-col gap-4">
        <EventOversight name={nameOversight} />
        <EventFilter
          name={nameFilter}
          placeholder={placeholder}
          options={options}
          onClickButton={onClickButton}
        />
        <EventTable tableData={tableData} statuses={statuses} />
      </div>
    </div>
  );
}
