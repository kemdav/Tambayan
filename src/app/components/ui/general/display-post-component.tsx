import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import LikeIcon from "@/app/components/icons/LikeIcon";
import CommentIcon from "@/app/components/icons/CommentIcon";

interface DisplayPostComponentProps {
  posterName: string;
  avatarSrc?: string | null;
  daysSincePosted: number;
  title?: string; // HTML string
  content: string; // markdown string
  imageSrc?: string;
  likes: number;
  comments: number;
  tags?: string[];
  onLike?: () => void;
  onComment?: () => void;
}

export const DisplayPostComponent: React.FC<DisplayPostComponentProps> = ({
  posterName,
  avatarSrc,
  daysSincePosted,
  title,
  content,
  imageSrc,
  likes,
  comments,
  tags = [],
  onLike,
  onComment,
}) => {
  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-2xl w-full mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <AvatarIcon src={avatarSrc} alt={posterName} className="h-8 w-8 text-base" />
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-neutral-muted-olive">{posterName}</span>
          <span className="text-xs text-gray-400">{daysSincePosted} days ago</span>
        </div>
      </div>
      <div className="mb-2 text-sm text-gray-700 whitespace-pre-line break-words overflow-hidden">{content}</div>
      {imageSrc && (
        <div className="mb-2">
          <img src={imageSrc} alt="post" className="rounded-lg max-h-64 object-contain mx-auto" />
        </div>
      )}
      <div className="flex items-center gap-4 mt-2">
        <Button className="flex items-center gap-1 px-2 py-1 text-xs" onClick={onLike}>
          <LikeIcon className="w-4 h-4" /> {likes}
        </Button>
        <Button className="flex items-center gap-1 px-2 py-1 text-xs" onClick={onComment}>
          <CommentIcon className="w-4 h-4" /> {comments}
        </Button>
      </div>
    </div>
  );
}; 