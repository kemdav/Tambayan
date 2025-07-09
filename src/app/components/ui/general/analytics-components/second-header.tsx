"use client";

import { Button } from "../button";
import { Download } from "lucide-react";
import DropDownRole from "../dropdown/dropdown-role";

interface TimePeriod {
  label: string;
  value: string;
}
interface Props {
  timeperiods?: TimePeriod[];
  onTimePeriodChange?: (value: string) => void;
}

export default function SecondHeader({
  timeperiods = [],
  onTimePeriodChange,
}: Props) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-[10px] p-4 bg-white shadow-md mt-4">
      <div className="flex items-center gap-2 text-sm">
        <span>Time Period:</span>
        <DropDownRole
          placeholder="This Week"
          options={timeperiods}
          onSelect={onTimePeriodChange}
        />
      </div>
    </div>
  );
}
