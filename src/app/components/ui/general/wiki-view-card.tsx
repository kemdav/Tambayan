"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

interface WikiViewCardProps {
  title?: string;
  icon?: React.ReactNode;
  description?: string;
  hasPermission?: boolean;
  onEdit?: () => void;
  onBack?: () => void;
}

const DEFAULT_DESCRIPTION = "No information provided.";

export default function WikiViewCard({
  title = "Wiki Title",
  icon,
  description,
  hasPermission = false,
  onEdit,
  onBack,
}: WikiViewCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(description || "");
  const [currentContent, setCurrentContent] = useState(description || "");
  const [editTitle, setEditTitle] = useState(title);
  const [currentTitle, setCurrentTitle] = useState(title);

  const handleEditClick = () => {
    setEditTitle(currentTitle);
    setEditValue(currentContent);
    setIsEditing(true);
    if (onEdit) onEdit();
  };

  const handleSave = () => {
    setCurrentTitle(editTitle);
    setCurrentContent(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditTitle(currentTitle);
    setEditValue(currentContent);
  };

  return (
    <div className="flex justify-center px-4 py-6 sm:py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl min-h-[400px] max-h-[80vh] bg-white border rounded-md shadow-md overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-green-100 border-b">
          <div className="flex items-center gap-2 font-semibold text-green-800">
            {icon && <span className="flex items-center">{icon}</span>}
            <span>{currentTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            {hasPermission && !isEditing && (
              <button
                onClick={handleEditClick}
                className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
              >
                Edit
              </button>
            )}
            {onBack && (
              <button
                onClick={onBack}
                className="text-sm px-3 py-1 border rounded bg-white hover:bg-gray-100"
              >
                Back
              </button>
            )}
          </div>
        </div>
        <div
          className="overflow-y-auto scrollbar-hidden p-4 text-sm text-gray-700"
          style={{ maxHeight: "calc(80vh - 56px)" }}
        >
          <div className="prose prose-sm max-w-none">
            {isEditing ? (
              <div className="flex flex-col gap-2">
                <input
                  className="w-full border rounded p-2 text-gray-800 font-semibold"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Wiki Title"
                />
                <textarea
                  className="w-full min-h-[150px] border rounded p-2 text-gray-800"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <ReactMarkdown>
                {currentContent?.trim() || DEFAULT_DESCRIPTION}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
