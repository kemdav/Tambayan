"use client";

import * as React from "react";
import { Button } from "./button";
import { Input } from "./input/input";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { FormattableInput } from "./input/FormattableInput";
import { TagComponent } from "./tag-component";
import { DateTimePicker } from "@/app/components/ui/general/date-picker/date-picker-component";

type OrgOption = {
  value: string;
  label: string;
};


const postTypeOptions = [
  { value: "default", label: "Default" },
  { value: "event", label: "Event" },
];

interface CreatePostComponentProps {
  className?: string;
  postType: 'default' | 'official' | 'event';
  isOfficialMode?: boolean; // True when creating content FOR an org (as an officer)
  
  // State and handlers from parent
  // Only used for 'default' (community) posts
  org?: string | null;
  onOrgChange?: (org: string | null) => void;
  orgOptions?: OrgOption[];
  
  title: string;
  onTitleChange: (title: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  photoFile: File | null;
  onPhotoChange: (file: File | null) => void;
  
  // Event-specific fields
  eventLocation?: string;
  onEventLocationChange?: (location: string) => void;
  eventDate?: Date | undefined;
  onEventDateChange?: (date: Date | undefined) => void;
  
  // Control props
  onPost: () => void;
  isSubmitting: boolean;
  postButtonText?: string;
}
export function CreatePostComponent({
  className = "",
  postType,
  isOfficialMode = false,
  org,
  onOrgChange = () => {},
  orgOptions = [],
  title,
  onTitleChange,
  content,
  onContentChange,
  onPost,
  photoFile,
  onPhotoChange,
  eventLocation = "",
  onEventLocationChange = () => {},
  eventDate,
  onEventDateChange = () => {},
  isSubmitting,
  postButtonText = "Post",
}: CreatePostComponentProps) {

  return (
     <div className={`w-full max-w-sm md:max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-lg ${className}`}>
      <h2 className="text-xl font-bold text-gray-800">
        {postType === 'event' ? 'Create New Event' 
          : postType === 'official' ? 'Create Official Post' 
          : 'Create Community Post'}
      </h2>
      
      {/* --- CONDITIONAL UI LOGIC --- */}
      
      {/* 1. Show "Select Organization" dropdown ONLY for community posts (not official mode) */}
      {!isOfficialMode && postType === 'default' && (
        <div>
          <label className="block text-sm font-medium text-neutral-muted-olive mb-1">Post to Organization:</label>
          <DropdownRole
            options={orgOptions}
            placeholder={org ? orgOptions.find(o => o.value === org)?.label : "Select Organization"}
            width="w-full"
            height="h-10"
            onSelect={onOrgChange}
          />
        </div>
      )}

      {/* 2. Common Fields for All Types (Posts and Events) */}
      <div>
        <label className="block text-sm font-medium text-neutral-muted-olive mb-1">
          {postType === 'event' ? "Event Title" : "Title"}
        </label>
        <Input
          type="text"
          placeholder={postType === 'event' ? "e.g., Annual Tech Summit" : "e.g., Important Announcement"}
          value={title}
          onChange={e => onTitleChange(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-muted-olive mb-1">
            {postType === 'event' ? "Description" : "Content"}
        </label>
        <FormattableInput
          value={content}
          onChange={val => onContentChange(val as string)}
          placeholder="Share details here..."
          isFormattable={false}
          multiline={true}
          className="min-h-[120px] md:min-h-[150px]" 
        />
      </div>
      
      {/* 3. Fields ONLY for Events */}
      {postType === 'event' && (
        // Use a grid for better alignment on larger screens
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2"> {/* Location spans full width */}
            <label className="block text-sm font-medium ...">Location</label>
            <Input
              type="text"
              placeholder="e.g., University Auditorium"
              value={eventLocation}
              onChange={e => onEventLocationChange(e.target.value)}
            />
          </div>
          <div className="flex-1"> {/* Date picker takes one column */}
            <label className="block text-sm font-medium ...">Event Date & Time</label>
            <DateTimePicker date={eventDate} setDate={onEventDateChange} />
          </div>
        </div>
      )}

      {/* 4. "Attach Image" button for all post/event types */}
    
      <div className="flex justify-between items-center mt-4">
        {postType !== 'event' && (
          <button
            type="button"
            className="px-3 py-1 rounded bg-gray-100 hover:bg-green-100 text-sm font-medium text-gray-700 transition-colors"
            onClick={() => document.getElementById('photo-upload-input')?.click()}
          >
            Attach Image
          </button>
      )}
        <input
          id="photo-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => onPhotoChange(e.target.files?.[0] || null)}
        />
        {photoFile && <span className="text-xs ml-2 text-gray-500 italic">{photoFile.name}</span>}
      </div>

      {/* 5. Submit Button */}
      <div className="flex justify-end mt-2">
        <Button onClick={onPost} disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : postButtonText}
        </Button>
      </div>
    </div>
  );
}