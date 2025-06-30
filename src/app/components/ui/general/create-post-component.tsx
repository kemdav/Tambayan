"use client";

import * as React from "react";
import { Button } from "./button";
import { Input } from "./input/input";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { FormattableInput } from "./input/FormattableInput";
import { TagComponent } from "./tag-component";

const orgOptions = [
  { value: "icpep", label: "ICPEP" },
  { value: "jpia", label: "JPIA" },
  { value: "ces", label: "CES" },
];

const postTypeOptions = [
  { value: "default", label: "Default" },
  { value: "event", label: "Event" },
];

interface CreatePostComponentProps {
  className?: string;
  postType: string;
  onPostTypeChange: (type: string) => void;
  org: string | null;
  onOrgChange: (org: string | null) => void;
  title: string;
  onTitleChange: (title: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onPost: () => void;
  // Default post fields
  tags?: string[];
  tagInput?: string;
  onTagInputChange?: (input: string) => void;
  onAddTag?: () => void;
  onRemoveTag?: (tag: string) => void;
  photoFile?: File | null;
  onPhotoChange?: (file: File | null) => void;
  // Event post fields
  eventLocation?: string;
  onEventLocationChange?: (location: string) => void;
  eventDate?: string;
  onEventDateChange?: (date: string) => void;
  registrationPeriod?: string;
  onRegistrationPeriodChange?: (period: string) => void;
  // Button text (optional)
  postButtonText?: string;
}

export function CreatePostComponent({
  className = "",
  postType,
  onPostTypeChange,
  org,
  onOrgChange,
  title,
  onTitleChange,
  content,
  onContentChange,
  onPost,
  tags = [],
  tagInput = "",
  onTagInputChange,
  onAddTag,
  onRemoveTag,
  photoFile = null,
  onPhotoChange,
  eventLocation = "",
  onEventLocationChange,
  eventDate = "",
  onEventDateChange,
  registrationPeriod = "",
  onRegistrationPeriodChange,
  postButtonText = "Post",
}: CreatePostComponentProps) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm w-full mx-auto mb-4 ${className}`}>
      <div className="flex flex-row gap-4 w-full">
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-muted-olive mb-1">Create Post:</label>
          <DropdownRole
            options={postTypeOptions}
            placeholder={postTypeOptions.find(o => o.value === postType)?.label || "Select Post Type"}
            width="w-full"
            height="h-10"
            onSelect={onPostTypeChange}
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-neutral-muted-olive mb-1">Select Organization:</label>
          <DropdownRole
            options={orgOptions}
            placeholder={org ? orgOptions.find(o => o.value === org)?.label : "Select Organization"}
            width="w-full"
            height="h-10"
            onSelect={onOrgChange}
          />
        </div>
      </div>
      {postType === "default" && (
        <>
          <label className="text-sm font-medium text-neutral-muted-olive">Post Title</label>
          <Input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            className="mb-2"
          />
          <label className="text-sm font-medium text-neutral-muted-olive">Post Content</label>
          <div className="relative mb-2">
            <FormattableInput
              value={content}
              onChange={val => onContentChange(val as string)}
              isFormattable={true}
              multiline={true}
              placeholder="What's happening in your organization?"
              className="mb-2 pr-10"
            />
            {/* Clip icon for photo attachment */}
            <button
              type="button"
              className="absolute bottom-3 left-3 p-1 rounded hover:bg-gray-100"
              onClick={() => document.getElementById('photo-upload-input')?.click()}
              tabIndex={-1}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M16.5 13.5V7.75a4.75 4.75 0 10-9.5 0v8.5a6.25 6.25 0 0012.5 0V7" stroke="#719281" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12.5V7.75a4 4 0 118 0v8.5a4.75 4.75 0 11-9.5 0V7" stroke="#719281" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <input
              id="photo-upload-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => onPhotoChange && onPhotoChange(e.target.files?.[0] || null)}
            />
            {photoFile && <span className="text-xs ml-2">{photoFile.name}</span>}
          </div>
          {/* Tags UI using TagComponent */}
          <div className="mb-2">
            <label className="text-sm font-medium text-neutral-muted-olive">Tags</label>
            <TagComponent
              tags={tags}
              tagInput={tagInput}
              onTagInputChange={onTagInputChange ?? (() => {})}
              onAddTag={onAddTag ?? (() => {})}
              onRemoveTag={onRemoveTag}
            />
          </div>
        </>
      )}
      {postType === "event" && (
        <>
          <Input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={e => onTitleChange(e.target.value)}
            className="mb-2"
          />
          <label className="text-sm font-medium text-neutral-muted-olive">Description</label>
          <FormattableInput
            value={content}
            onChange={val => onContentChange(val as string)}
            isFormattable={true}
            multiline={true}
            placeholder="What's happening in your organization?"
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Location"
            value={eventLocation}
            onChange={e => onEventLocationChange && onEventLocationChange(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Date"
            value={eventDate}
            onChange={e => onEventDateChange && onEventDateChange(e.target.value)}
            className="mb-2"
          />
          <Input
            type="text"
            placeholder="Registration Period"
            value={registrationPeriod}
            onChange={e => onRegistrationPeriodChange && onRegistrationPeriodChange(e.target.value)}
            className="mb-2"
          />
        </>
      )}
      <div className="flex justify-end mt-2">
        <Button onClick={onPost}>{postButtonText}</Button>
      </div>
    </div>
  );
} 