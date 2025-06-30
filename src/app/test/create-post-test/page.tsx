"use client";
import * as React from "react";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";

export default function CreatePostTestPage() {
  const [postType, setPostType] = React.useState("default");
  const [org, setOrg] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [registrationPeriod, setRegistrationPeriod] = React.useState("");
  const [submitted, setSubmitted] = React.useState<any>(null);

  // Tag and photo state
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);

  // Tag handlers
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Photo handler
  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
  };

  const handlePost = () => {
    setSubmitted({
      postType,
      org,
      title,
      content,
      eventLocation,
      eventDate,
      registrationPeriod,
      tags,
      photoFileName: photoFile?.name || null,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-mint-white flex flex-col items-center justify-center p-4">
      <CreatePostComponent
        className="max-w-2xl"
        postType={postType}
        onPostTypeChange={setPostType}
        org={org}
        onOrgChange={setOrg}
        title={title}
        onTitleChange={setTitle}
        content={content}
        onContentChange={setContent}
        onPost={handlePost}
        eventLocation={eventLocation}
        onEventLocationChange={setEventLocation}
        eventDate={eventDate}
        onEventDateChange={setEventDate}
        registrationPeriod={registrationPeriod}
        onRegistrationPeriodChange={setRegistrationPeriod}
        tags={tags}
        tagInput={tagInput}
        onTagInputChange={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        photoFile={photoFile}
        onPhotoChange={handlePhotoChange}
      />
    </div>
  );
} 