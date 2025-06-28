"use client";

import React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { cn } from "@/lib/utils"; // Optional if you're using `cn` for conditional classes

interface ButtonProps {
  label: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
}

interface ShowcaseCardProps {
  title: string;
  subtitle: string;
  bgColor?: string;
  tagText: string;
  tagBgColor?: string;
  tagTextColor?: string;
  memberCount: number;
  eventCount: number;
  buttons: ButtonProps[];
  avatarUrl?: string;
  coverPhotoUrl?: string;
}

export default function ShowcaseCard({
  title = "No Title",
  bgColor = "bg-green-500",
  subtitle = "No Subtitle",
  tagText = "Tag",
  tagBgColor = "bg-green-100",
  tagTextColor = "text-green-800",
  memberCount = 0,
  eventCount = 0,
  buttons,
  avatarUrl,
  coverPhotoUrl,
}: ShowcaseCardProps) {
  return (
    <div className="rounded-xl shadow-md bg-white border border-gray-200 h-[347px] w-[294px]">
      <div
        className={cn(
          !coverPhotoUrl && bgColor,
          "rounded-t-xl flex justify-center items-center h-[96px] relative"
        )}
        style={coverPhotoUrl ? { backgroundImage: `url(${coverPhotoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      >
        <AvatarIcon src={avatarUrl} className="absolute left-4 top-full -mt-7 z-10 w-14 h-14 bg-white" />
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

        <div
          className={cn(
            "mt-4 flex gap-2",
            buttons.length === 1 ? "justify-center" : "justify-between"
          )}
        >
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={btn.onClick}
              className={cn(
                "text-[15px] py-1 px-4 rounded-[5px] hover:brightness-110 transition cursor-pointer",
                btn.bgColor || "bg-green-300",
                btn.textColor || "text-white"
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}