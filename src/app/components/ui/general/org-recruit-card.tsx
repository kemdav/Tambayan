import React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface OrgRecruitCardProps {
  title: string;
  orgID: string;
  subtitle: string;
  bgColor?: string;
  tagText: string;
  tagBgColor?: string;
  tagTextColor?: string;
  memberCount: number;
  eventCount: number;
  avatarUrl?: string;
  coverPhotoUrl?: string;
  onView?: () => void;
  onJoin?: () => void;
  joinLabel?: string;
  joinDisabled?: boolean;
}

export default function OrgRecruitCard({
  title = "No Title",
  bgColor = "bg-green-500",
  subtitle = "No Subtitle",
  tagText = "Tag",
  tagBgColor = "bg-green-100",
  tagTextColor = "text-green-800",
  memberCount = 0,
  eventCount = 0,
  avatarUrl,
  coverPhotoUrl,
  onView,
  onJoin,
  joinLabel = "Join",
  joinDisabled = false,
}: OrgRecruitCardProps) {
  return (
    <div className="rounded-xl shadow-md bg-white border border-gray-200 h-[320px] w-[220px] flex flex-col justify-between">
      <div
        className={cn(
          !coverPhotoUrl && bgColor,
          "rounded-t-xl flex justify-center items-center h-[96px] relative"
        )}
        style={coverPhotoUrl ? { backgroundImage: `url(${coverPhotoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <AvatarIcon 
          src={avatarUrl} 
          alt={avatarUrl ? "User avatar" : "Default avatar"} 
          className="absolute left-4 top-full -mt-7 z-10 w-14 h-14 bg-white" 
        />
      </div>

      <div className="pt-10 pb-4 px-4 text-left">
        <h1 className="text-[15px] font-semibold">{title}</h1>
        <p className="text-[13px] text-gray-500">{subtitle}</p>

        <span
          className={cn(
            "inline-block mt-2 px-3 py-1 text-xs rounded-full font-medium",
            tagBgColor,
            tagTextColor
          )}
        >
          {tagText}
        </span>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-700">
          <div>
            <p className="font-bold text-[15px] text-center">{memberCount}</p>
            <p className="text-xs text-gray-500">Members</p>
          </div>
          <div>
            <p className="font-bold text-[15px] text-center">{eventCount}</p>
            <p className="text-xs text-gray-500">Events</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between gap-2">
          <Button variant="default" onClick={onView} className="w-1/2">View</Button>
          <Button variant="outline" onClick={onJoin} className="w-1/2" disabled={joinDisabled}>{joinLabel}</Button>
        </div>
      </div>
    </div>
  );
} 