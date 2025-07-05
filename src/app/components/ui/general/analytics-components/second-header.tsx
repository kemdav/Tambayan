"use client";

import { Button } from "../button";
import { Download } from "lucide-react";
import DropDownRole from "../dropdown/dropdown-role";

interface TimePeriod {
  label: string;
  value: string;
}
interface Filter {
  label: string;
  value: string;
}
interface Props {
  timeperiods?: TimePeriod[];
  filters?: Filter[];
}

export default function SecondHeader({
  timeperiods = [],
  filters = [],
}: Props) {
  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border rounded-[10px] p-4 bg-white shadow-md mt-4">
      <div className="flex items-center gap-2 text-sm">
        <span>Time Period:</span>
        <DropDownRole placeholder="Last 30 Days" options={timeperiods} />
      </div>

      <div className="flex items-center gap-2 text-sm">
        <span>School:</span>
        <DropDownRole placeholder="All Schools" options={filters} />
      </div>

      <Button
        className="text-white w-full sm:w-auto"
        onClick={() => console.log("Clicked")}
      >
        <Download className="w-4 h-4 mr-2" />
        Export Report
      </Button>
    </div>
  );
}
