"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ReactNode } from "react";

interface EventButton {
  id: string;
  title?: string;
  description?: string;
  date?: string;
  buttonLabel: string;
  buttonColorClass?: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
}

interface UpcomingorgEventComponentProps {
  events: EventButton[];
}

export default function UpcomingorgEventComponent({
  events,
}: UpcomingorgEventComponentProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className={cn(
          "flex flex-col p-6 w-[1106px] h-[709px] border rounded-[10px] border-black bg-white"
        )}
        style={{ overflow: "hidden" }}
      >
        <h1 className="text-2xl font-bold text-green-700 border-b border-green-300 mb-4 pb-2">
          Upcoming Events
        </h1>

        <div className="flex flex-col gap-4 overflow-y-auto pr-2 flex-1 min-h-0 scrollbar-hidden">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="relative border border-gray-300 rounded-md p-4 bg-gray-100 h-[152px] shrink-0"
            >
              <h1 className="text-lg font-semibold">{event.title}</h1>
              <p className="text-sm text-gray-700">{event.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                Posted on: {event.date}
              </p>
              <div className="absolute bottom-4 left-4">
                <Button
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm",
                    event.buttonColorClass
                  )}
                  onClick={event.onButtonClick}
                >
                  {event.buttonIcon && (
                    <span className="flex items-center">
                      {event.buttonIcon}
                    </span>
                  )}
                  <span>{event.buttonLabel}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
