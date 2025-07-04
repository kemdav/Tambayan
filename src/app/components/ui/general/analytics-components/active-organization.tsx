"use client";

import { Users2, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Props {
  isValueUp?: boolean;
  currentPercent?: number;
  lastPeriodPercent?: number;
}

export default function ActiveOrganization({
  isValueUp = true,
  currentPercent = 0,
  lastPeriodPercent = 0,
}: Props) {
  const ArrowIcon = isValueUp ? ArrowUpRight : ArrowDownRight;
  const arrowColor = isValueUp ? "text-green-600" : "text-red-600";

  return (
    <div className="border rounded-lg p-4 w-full max-w-[325px] shadow-sm mt-4">
      <div className="flex justify-between items-start">
        <p className="text-sm text-muted-foreground">Active Organization</p>
        <div className="bg-muted rounded-md p-1">
          <Users2 className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-2">
        <p className="text-2xl font-semibold">
          {currentPercent !== undefined ? `${currentPercent}%` : "--"}
        </p>
        {lastPeriodPercent !== undefined && (
          <div className={`flex items-center gap-1 mt-1 text-xs ${arrowColor}`}>
            <ArrowIcon className="h-4 w-4" />
            <span>{lastPeriodPercent}% from last period</span>
          </div>
        )}
      </div>
    </div>
  );
}
