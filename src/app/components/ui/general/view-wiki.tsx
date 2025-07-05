"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface WikiPageComponentProps {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  onBack?: () => void;
  canEdit?: boolean;
  onEdit?: () => void;
}

const DEFAULT_DESCRIPTION = "No information provided.";

export default function WikiViewComponent({
  title = "How to join",
  icon,
  description,
  onBack,
  canEdit = false,
  onEdit,
}: WikiPageComponentProps) {
  return (
    <div className="flex justify-center px-4 py-6 sm:py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl min-h-[400px] max-h-[80vh] bg-white border rounded-md shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-green-100 border-b">
          <div className="flex items-center gap-2 font-semibold text-green-800">
            {icon && <span className="flex items-center">{icon}</span>}
            <span>{title}</span>
          </div>
          <div className="flex items-center gap-2">
            {canEdit && (
              <button
                onClick={onEdit}
                className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
              >
                Edit
              </button>
            )}
            <button
              onClick={onBack}
              className="text-sm px-3 py-1 border rounded bg-white hover:bg-gray-100"
            >
              Back
            </button>
          </div>
        </div>

        <div
          className="overflow-y-auto scrollbar-hidden p-4 text-sm text-gray-700"
          style={{ maxHeight: "calc(80vh - 56px)" }}
        >
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>
              {description?.trim() || DEFAULT_DESCRIPTION}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
