"use client";
import * as React from "react";
import { CreateDisplayPostCombined } from "@/app/components/ui/general/create-display-post-combined";

export default function CreatePostWDDisplayTestPage() {
  const [postType, setPostType] = React.useState("default");
  const [org, setOrg] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [eventLocation, setEventLocation] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [registrationStart, setRegistrationStart] = React.useState<
    Date | undefined
  >();
  const [registrationEnd, setRegistrationEnd] = React.useState<
    Date | undefined
  >();
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState("");
  const [displayData, setDisplayData] = React.useState<any>(null);
  const [postSuccess, setPostSuccess] = React.useState(false);

  // Tag handlers (if you want to use tags in DisplayPostComponent)
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePost = () => {
    setDisplayData({
      posterName: "Unknown",
      recipient: postType === "default" ? org || undefined : undefined,
      avatarSrc: null,
      daysSincePosted: 0,
      title,
      content,
      imageSrc: photoFile ? URL.createObjectURL(photoFile) : undefined,
      likes: 0,
      comments: 0,
      tags,
      event: postType === "event" ? title : undefined,
      eventLocation: postType === "event" ? eventLocation : undefined,
      eventDate: postType === "event" ? eventDate : undefined,
      registrationPeriod:
        postType === "event" && registrationStart && registrationEnd
          ? `${registrationStart.toLocaleString()} - ${registrationEnd.toLocaleString()}`
          : undefined,
      isDetailed: postType === "event",
    });
  };

  const handlePostSuccess = () => {
    setPostSuccess(true);
    // You can also show a toast or alert here
    alert("Post successfully created!");
  };

  return (
    <div className="min-h-screen bg-neutral-mint-white flex flex-col items-center justify-center p-4">
      <CreateDisplayPostCombined
        className="max-w-2xl w-full"
        onPostSuccess={handlePostSuccess}
      />
      {postSuccess && (
        <div className="mt-4 text-green-600 font-semibold">
          Post was successfully posted!
        </div>
      )}
    </div>
  );
}
