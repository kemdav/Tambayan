// app/components/ui/general/upcoming-event-component.tsx
"use client";

import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

interface UpcomingEventComponentProps {
  orgName: string;
  avatarSrc?: string | null;
  eventTitle: string;
  eventDescription: string;
  eventDate: string | null; // <-- Add new prop for date
  eventLocation: string | null; // <-- Add new prop for location
  buttonLabel: string;
  buttonColorClass?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
  showButton?: boolean;
  // 'daysAgo' is no longer needed as we'll display the full date
}

// A simple helper to format the date. For more complex needs, use a library like date-fns.
const formatEventDate = (dateString: string | null) => {
  if (!dateString) return "Date not specified";
  try {
    const date = new Date(dateString);
    // Example format: "November 15, 2024 at 9:00 AM"
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    return "Invalid date";
  }
};

export const UpcomingEventComponent: React.FC<UpcomingEventComponentProps> = ({
  orgName,
  avatarSrc,
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  showButton = true,
  buttonLabel,
  buttonColorClass = "bg-green-500 text-white hover:bg-green-600",
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm w-full max-w-5xl mx-auto mb-4">
      {/* Header with Org Name - No changes here */}
      <div className="flex items-center gap-3">
        <AvatarIcon src={avatarSrc} alt={orgName} className="h-12 w-12 border border-secondary-light-moss" />
        <div className="flex flex-col">
          <span className="font-semibold text-base text-neutral-muted-olive">{orgName}</span>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <div className="font-bold text-xl mb-2">{eventTitle}</div>

        {/* --- NEW SECTION FOR DATE AND LOCATION --- */}
        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2 text-sm text-gray-600 mb-3">
          {eventDate && (
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-500" />
              <span>{formatEventDate(eventDate)}</span>
            </div>
          )}
          {eventLocation && (
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <span>{eventLocation}</span>
            </div>
          )}
        </div>
        {/* --- END NEW SECTION --- */}

        <div className="text-gray-700 text-base whitespace-pre-line">{eventDescription}</div>
      </div>

      {/* Button */}
      <div>
        {showButton && (
          <Button
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm ${buttonColorClass}`}
            onClick={onButtonClick}
          >
            {buttonIcon}
            {buttonLabel}
          </Button>
        )}
      </div>
    </div>
  );
};