"use client";

import { Button } from "../general/button";
import type { EventData } from "@/lib/actions/event-oversight";

interface StatusStyle {
  label: string;
  bgColor: string;
  textColor: string;
}

interface Props {
  tableData?: EventData[];
  statuses?: StatusStyle[]; // ✅ full list of styles to match from
  onRemove?: (event: EventData) => void;
}

export default function EventTable({
  tableData = [],
  statuses = [],
  onRemove,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-[10px] border border-green-900 w-full mt-4 max-w-[1066px]">
      <table className="min-w-[600px] w-full border-collapse text-left text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Event Name
            </th>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Organization
            </th>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Date
            </th>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Location
            </th>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Status
            </th>
            <th className="px-2 py-2 sm:px-4 text-action-forest-green font-semibold whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((event, index) => {
            const style = statuses.find(
              (s) => s.label.toLowerCase() === event.status?.toLowerCase()
            );
            return (
              <tr key={index}>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4 whitespace-nowrap">
                  {event.eventName}
                </td>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4 whitespace-nowrap">
                  {event.orgname || event.organization}
                </td>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4 whitespace-nowrap">
                  {event.date}
                </td>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4 whitespace-nowrap">
                  {event.location}
                </td>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4 whitespace-nowrap">
                  {(() => {
                    if (event.status === "Upcoming") {
                      return (
                        <span className="px-2 py-1 rounded-full text-sm font-medium border border-tint-beige-cream bg-yellow-100 text-yellow-800">
                          Upcoming
                        </span>
                      );
                    } else if (
                      event.status === "Finished" ||
                      event.status === "finished"
                    ) {
                      return (
                        <span className="px-2 py-1 rounded-full text-sm font-medium border border-tint-beige-cream bg-blue-100 text-blue-800">
                          Finished
                        </span>
                      );
                    } else if (style) {
                      return (
                        <span
                          className={`px-2 py-1 rounded-full text-sm font-medium border border-tint-beige-cream ${style.bgColor} ${style.textColor}`}
                        >
                          {style.label}
                        </span>
                      );
                    } else {
                      return event.status || "-";
                    }
                  })()}
                </td>
                <td className="border-t border-y-tint-beige-cream px-2 py-2 sm:px-4">
                  <Button
                    className="bg-red-500 text-white px-3 py-1.5 text-xs sm:text-sm rounded transition-transform duration-150 active:scale-90"
                    onClick={() => onRemove && onRemove(event)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
