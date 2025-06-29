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
    <div className="flex items-center justify-center w-full bg-gray-50 p-4">
      <div
        className={cn(
          "flex flex-col p-4 sm:p-6 w-full max-w-4xl h-full max-h-[709px] bg-white rounded-lg shadow-md border-t-4 border-t-gray-800"
        )}
        style={{ overflow: "hidden" }}
      >
        <h1 className="text-xl sm:text-2xl font-bold text-green-700 border-b border-green-300 mb-4 pb-2">
          Upcoming Events
        </h1>
        <div className="flex flex-col gap-4 overflow-y-auto pr-2 flex-1 min-h-0 scrollbar-hidden">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 bg-white"
            >
              <h1 className="text-lg font-semibold text-gray-900">{event.title}</h1>
              <p className="text-sm text-gray-700 mt-1">{event.description}</p>
              <p className="text-xs text-gray-500 mt-2">
                Posted on: {event.date}
              </p>
              <div className="mt-3">
                <Button
                  className={cn(
                    "flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium text-xs",
                    event.buttonColorClass
                  )}
                  onClick={event.onButtonClick}
                >
                  {event.buttonIcon && (
                    <span className="flex items-center">
                      {event.buttonIcon}
                    </span>
                  )}
                  <span className="hidden sm:inline">{event.buttonLabel}</span>
                  <span className="sm:hidden">
                    {event.buttonLabel.includes("Deregister") ? "Deregister" : "Register"}
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}