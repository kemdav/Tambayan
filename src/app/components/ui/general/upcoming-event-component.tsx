"use client";

import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";

interface UpcomingEventComponentProps {
  orgName: string;
  avatarSrc?: string | null;
  daysAgo: number;
  eventTitle: string;
  eventDescription: string;
  buttonLabel: string;
  buttonColorClass?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}

export const UpcomingEventComponent: React.FC<UpcomingEventComponentProps> = ({
  orgName,
  avatarSrc,
  daysAgo,
  eventTitle,
  eventDescription,
  buttonLabel,
  buttonColorClass = "bg-green-500 text-white hover:bg-green-600",
  buttonIcon,
  onButtonClick,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm w-full max-w-5xl mx-auto mb-4">
      <div className="flex items-center gap-3">
        <AvatarIcon src={avatarSrc} alt={orgName} className="h-12 w-12 border border-secondary-light-moss" />
        <div className="flex flex-col">
          <span className="font-semibold text-base text-neutral-muted-olive">{orgName}</span>
          <span className="text-xs text-gray-400">{daysAgo} days ago</span>
        </div>
      </div>
      <div>
        <div className="font-bold text-lg mb-1">{eventTitle}</div>
        <div className="text-gray-700 text-base whitespace-pre-line">{eventDescription}</div>
      </div>
      <div>
        <Button
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm ${buttonColorClass}`}
          onClick={onButtonClick}
        >
          {buttonIcon}
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}; 