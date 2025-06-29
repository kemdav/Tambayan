// components/student-joined-component.tsx

"use client";

import { cn } from "@/lib/utils";
import { AvatarIcon } from "./avatar-icon-component";

export interface EventCard {
  url: string;
  id: number;
  org: string;
  date: string;
  title: string;
  description: string;
}

interface StudentJoinedComponentProps {
  className?: string;
  events: EventCard[]; // <-- pass events from parent page
}

export default function StudentJoinedComponent({
  className,
  events,
}: StudentJoinedComponentProps) {
  return (
    <div
      className={cn(
        "w-[423px] h-[426px] border rounded-[10px] bg-action-seafoam-green pt-2 pl-2 font-sans",
        className
      )}
    >
      <h1 className="text-xl font-bold text-green-700 mb-3 ml-1">
        Events Joined
      </h1>

      <div className="overflow-y-auto h-[344px] scrollbar-hidden pr-2">
        {events.map((event) => (
          <div
            key={event.id}
            className="w-[406px] min-h-[106px] bg-white border rounded-lg shadow-sm p-3 mb-2"
          >
            <div className="relative flex">
              <div className="absolute top-0 left-0">
                <AvatarIcon src={event.url} className="w-8 h-8" />
              </div>

              <div className="w-full">
                <div className="pl-11 text-sm font-medium text-gray-700">
                  {event.org}
                </div>
                <div className="pl-11 text-xs text-gray-400">{event.date}</div>
                <div className="mt-1 text-sm font-semibold text-black leading-tight">
                  {event.title}
                </div>
                <div className="text-xs text-gray-600">{event.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
