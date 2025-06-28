"use client";

import * as React from "react";
import { Button } from "./button";
import { Input } from "./input/input";
import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { DisplayPostComponent } from "./display-post-component";
import { FormattableInput } from "./input/FormattableInput";

const orgOptions = [
  { value: "icpep", label: "ICPEP" },
  { value: "jpia", label: "JPIA" },
  { value: "ces", label: "CES" },
];

export function CreatePostComponent() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [org, setOrg] = React.useState<string | null>(null);
  const [photo, setPhoto] = React.useState<File | null>(null);
  const [event, setEvent] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [showPhoto, setShowPhoto] = React.useState(false);
  const [showEvent, setShowEvent] = React.useState(false);
  const [showTag, setShowTag] = React.useState(false);
  const [posted, setPosted] = React.useState(false);
  const [postData, setPostData] = React.useState<any>(null);

  const handlePost = () => {
    // Get HTML from FormattableInput's contentEditable div for content
    let htmlContent = content;
    if (contentRef.current) {
      htmlContent = contentRef.current.innerHTML;
    }
    setPosted(true);
    setPostData({
      posterName: "Unknown Org",
      orgLabel: orgOptions.find(o => o.value === org)?.label || "",
      event: event,
      avatarSrc: null,
      daysSincePosted: 0,
      title: title,
      content: htmlContent,
      imageSrc: photo ? URL.createObjectURL(photo) : undefined,
      likes: 0,
      comments: 0,
      tags: tags,
    });
  };

  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric and spaces, no commas
    const value = e.target.value.replace(/,/g, "");
    setTagInput(value);
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === " ") && tagInput.trim()) {
      handleAddTag();
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-4 shadow-sm w-full max-w-3xl mx-auto mb-4">
        <Input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="mb-2"
        />
        <label className="text-sm font-medium text-neutral-muted-olive">Post Content</label>
        <FormattableInput
          ref={contentRef}
          value={content}
          onChange={val => setContent(val as string)}
          isFormattable={true}
          multiline={true}
          placeholder="What's happening in your organization?"
          className="mb-2"
        />
        <label className="text-sm font-medium text-neutral-muted-olive">Select Organization:</label>
        <DropdownRole
          options={orgOptions}
          placeholder="Select Organization"
          width="w-full"
          height="h-10"
          buttonTextColor="text-neutral-muted-olive"
          buttonBorderColor="border-secondary-light-moss"
          buttonBgColor="bg-neutral-mint-white"
          buttonHoverTextColor="hover:text-white"
          buttonHoverBgColor="hover:bg-secondary-light-moss"
          buttonActiveBgColor="active:bg-secondary-light-moss"
          dropdownTextColor="text-neutral-muted-olive"
          dropdownBorderColor="border-secondary-light-moss"
          dropdownBgColor="bg-neutral-mint-white"
          dropdownHoverTextColor="hover:text-white"
          dropdownHoverBgColor="hover:bg-secondary-light-moss"
          dropdownActiveBgColor="active:bg-secondary-light-moss"
          onSelect={setOrg}
        />
        <div className="flex items-center gap-6 border-b pb-2 mt-2">
          <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowPhoto(v => !v)}>Photo</button>
          <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowEvent(v => !v)}>Event</button>
          <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowTag(v => !v)}>Tag</button>
          <div className="flex-1" />
          <Button className="bg-secondary-light-moss text-white px-6 py-1 rounded" onClick={handlePost}>Post</Button>
        </div>
        {showPhoto && (
          <div className="mt-2">
            <Input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
            {photo && <span className="text-xs ml-2">{photo.name}</span>}
          </div>
        )}
        {showEvent && (
          <div className="mt-2">
            <Input type="text" placeholder="Event Name" value={event} onChange={e => setEvent(e.target.value)} />
          </div>
        )}
        {showTag && (
          <div className="mt-2 flex gap-2 items-center flex-wrap">
            <input
              type="text"
              className="border rounded-lg p-2 text-sm"
              placeholder="Add tag and press Enter or Space"
              value={tagInput}
              onChange={handleTagInput}
              onKeyDown={handleTagKeyDown}
            />
            <Button type="button" className="px-3 py-1" onClick={handleAddTag}>Add</Button>
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary-pale-sage text-neutral-black rounded-full px-4 py-1 text-base font-normal ml-1"
                style={{ minWidth: "2.5rem", textAlign: "center" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {posted && postData && (
        <div className="mt-8 w-full max-w-3xl mx-auto">
          <DisplayPostComponent {...postData} />
        </div>
      )}
    </>
  );
} 