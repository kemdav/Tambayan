import React from "react";

interface PendingBroadcastProps {
  count?: number;
}

export default function PendingBroadcast({ count = 3 }: PendingBroadcastProps) {
  return (
    <div className="border rounded-lg p-4 w-full max-w-[325px] shadow-sm mt-4">
      <div className="flex justify-between items-start">
        <p className="text-sm text-muted-foreground">Pending Broadcasts</p>
        <div className="bg-muted rounded-md p-1">
          {/* Black and white megaphone icon */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="M3 10v4a1 1 0 001 1h2v-6H4a1 1 0 00-1 1z" fill="#000" />
            <path
              d="M21 6v12M19 8v8M17 10v4M7 9v6a3 3 0 006 0V9a3 3 0 00-6 0z"
              stroke="#000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold">{count}</p>
        <div className="text-xs text-muted-foreground mt-1">
          Awaiting approval
        </div>
      </div>
    </div>
  );
}
