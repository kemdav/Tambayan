// Your WikiViewCard.tsx file (or wherever it is located)
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

// Define the props this component now expects
interface WikiViewCardProps {
  title: string;
  description: string;
  isEditing: boolean;
  hasPermission: boolean;
  
  // --- New props for two-way data binding ---
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;

  // --- New props for actions ---
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const DEFAULT_DESCRIPTION = "No information provided.";

export default function WikiViewCard({
  title,
  description,
  isEditing,
  hasPermission,
  onTitleChange,
  onDescriptionChange,
  onSave,
  onCancel,
  onEdit,
}: WikiViewCardProps) {

  return (
    <div className="flex justify-center px-4 py-6 sm:py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl min-h-[400px] max-h-[80vh] bg-white border rounded-md shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between px-4 py-3 bg-green-100 border-b">
          <div className="flex items-center gap-2 font-semibold text-green-800">
            {/* The title is now directly from props */}
            <span>{isEditing ? 'Editing...' : title}</span> 
          </div>
          <div className="flex items-center gap-2">
            {/* Show Edit button only if user has permission AND is not currently editing */}
            {hasPermission && !isEditing && (
              <button
                onClick={onEdit} // Call the onEdit function from props
                className="text-sm px-3 py-1 border rounded bg-green-600 text-white hover:bg-green-700"
              >
                Edit
              </button>
            )}
            {/* The Back button is now completely removed as requested */}
          </div>
        </div>
        
        {/* Content Section */}
        <div
          className="overflow-y-auto scrollbar-hidden p-4 text-sm text-gray-700"
          style={{ maxHeight: "calc(80vh - 56px)" }}
        >
          <div className="prose prose-sm max-w-none">
            {isEditing ? (
              // --- EDITING VIEW ---
              (<div className="flex flex-col gap-2">
                <input
                  className="w-full border rounded p-2 text-gray-800 font-semibold"
                  value={title} // Value comes from props
                  onChange={e => onTitleChange(e.target.value)} // Call prop function on change
                  placeholder="Wiki Title"
                />
                <textarea
                  className="w-full min-h-[150px] border rounded p-2 text-gray-800"
                  value={description} // Value comes from props
                  onChange={e => onDescriptionChange(e.target.value)} // Call prop function on change
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={onSave} // Call prop function
                    className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={onCancel} // Call prop function
                    className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>)
            ) : (
              // --- VIEWING VIEW ---
              (<ReactMarkdown>
                {description?.trim() || DEFAULT_DESCRIPTION}
              </ReactMarkdown>)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}