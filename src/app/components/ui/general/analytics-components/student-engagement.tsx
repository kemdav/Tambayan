"use client";

import { PieChart } from "lucide-react";

interface Props {
  currentPercent?: number;
}

export default function StudentEngagement({ currentPercent = 0 }: Props) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-[325px] shadow-sm mt-4">
      <div className="flex justify-between items-start">
        <p className="text-sm text-muted-foreground">Student Engagement</p>
        <div className="bg-muted rounded-md p-1">
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-2">
        <p className="text-2xl font-semibold">
          {currentPercent !== undefined ? `${currentPercent}%` : "--"}
        </p>
      </div>
    </div>
  );
}
