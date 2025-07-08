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

interface OrganizationData {
  date: string;
  events: number;
  posts: number;
}

interface Props {
  data?: OrganizationData[];
  title?: string;
}
export default function OrganizationActivity({ data = [], title }: Props) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-full shadow-sm bg-white mt-4 mr-0 md:mr-4">
      <div className="flex justify-between items-start">
        <h2 className="text-base font-semibold text-muted-foreground">
          Organization Activity {title}
        </h2>
        <div className="flex gap-4 items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-muted stroke-muted-foreground" />
            <span>Posts</span>
          </div>
          <div className="flex items-center gap-1">
            <Circle className="h-3 w-3 fill-green-200 stroke-muted-foreground" />
            <span>Events</span>
          </div>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              style={{ fontSize: "13px", fill: "#6b7280" }}
            />

            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="posts"
              stroke="#8884d8"
              strokeWidth={2}
              name="Posts"
            />
            <Line
              type="monotone"
              dataKey="events"
              stroke="#82ca9d"
              strokeWidth={2}
              name="Events"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
