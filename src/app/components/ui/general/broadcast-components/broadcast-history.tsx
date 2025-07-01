import React from "react";

export interface Broadcast {
  id: string;
  title: string;
  message: string;
  date: string;
  recipients: string;
  preview: string;
  attachmentName?: string;
  attachmentImage?: string;
}

interface BroadcastHistoryProps {
  broadcasts: Broadcast[];
  filter: string;
  onFilterChange: (val: string) => void;
  onBroadcastClick: (broadcast: Broadcast) => void;
}

export function BroadcastHistory({ broadcasts, filter, onFilterChange, onBroadcastClick }: BroadcastHistoryProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 flex flex-col gap-4 shadow-sm w-full max-w-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold">Broadcast History</h2>
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filter}
          onChange={e => onFilterChange(e.target.value)}
        >
          <option value="all">All Broadcasts</option>
          <option value="students">Students</option>
          <option value="organizations">Organizations</option>
          <option value="schools">Schools</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {broadcasts.length === 0 && <div className="text-gray-400 text-sm">No broadcasts found.</div>}
        {broadcasts.map(b => (
          <button
            key={b.id}
            className="border-b pb-2 mb-2 text-left hover:bg-secondary-pale-sage rounded transition-colors"
            onClick={() => onBroadcastClick(b)}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold">{b.title}</span>
              <span className="text-xs text-gray-400">{b.date}</span>
            </div>
            <div className="text-sm text-gray-700 truncate">{b.preview}</div>
            <div className="text-xs text-gray-500 mt-1">Sent to: {b.recipients}</div>
          </button>
        ))}
      </div>
    </div>
  );
} 