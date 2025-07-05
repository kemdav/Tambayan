"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Circle } from "lucide-react";

interface EngagementData {
  date: string;
  engineering: number;
  arts: number;
  science: number;
}

interface Props {
  data?: EngagementData[];
}

export default function EngagementBySchool({ data = [] }: Props) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-[535px] shadow-sm bg-white mt-4 ml-0 md:ml-4">
      <div className="flex justify-between items-start">
        <h2 className="text-base font-semibold text-muted-foreground">
          Engagement by School
        </h2>
        <div className="flex gap-4 items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-muted stroke-muted-foreground" />
            <span>Engineering</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-green-200 stroke-muted-foreground" />
            <span>Arts</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-blue-300 stroke-muted-foreground" />
            <span>Science</span>
          </div>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="engineering"
              stroke="#86efac"
              strokeWidth={2}
              name="Engineering"
            />
            <Line
              type="monotone"
              dataKey="arts"
              stroke="#8884d8"
              strokeWidth={2}
              name="Arts"
            />
            <Line
              type="monotone"
              dataKey="science"
              stroke="#93c5fd"
              strokeWidth={2}
              name="Science"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
