import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import LikeIcon from "@/app/components/icons/LikeIcon";
import CommentIcon from "@/app/components/icons/CommentIcon";
import { CommentComponent } from "./comment-component";

interface DisplayPostComponentProps {
  posterName: string;
  event?: string;
  avatarSrc?: string | null;
  daysSincePosted: number;
  title?: string;
  content: string;
  imageSrc?: string;
  likes: number;
  comments: number;
  tags?: string[];
  onLike?: () => void;
  onComment?: () => void;
  orgLabel?: string;
}

export const DisplayPostComponent: React.FC<DisplayPostComponentProps> = ({
  posterName,
  event,
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
  orgLabel,
}) => {
  const [showComment, setShowComment] = React.useState(false);

  return (
    <>
      <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-2xl w-full mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <AvatarIcon src={avatarSrc} alt={posterName} className="h-8 w-8 text-base" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-muted-olive flex items-center gap-2">
              {posterName}
            </span>
            <span className="text-xs text-gray-400">{daysSincePosted} days ago</span>
          </div>
        </div>
        {title && (
          <div className="mb-2 text-xl font-bold text-gray-800">
            {title}: {orgLabel}
          </div>
        )}
        <div className="mb-2 text-base">
          <span className="font-bold">Unknown Org</span>
        </div>
        {event && (
          <div className="mb-2 text-base">
            <span className="font-bold">Event:</span> {event}
          </div>
        )}
        <div 
          className="mb-2 text-sm text-gray-700 whitespace-pre-line break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {tags.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-secondary-pale-sage text-neutral-black rounded-full px-3 py-1 text-xs font-normal"
                style={{ minWidth: "2rem", textAlign: "center" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {imageSrc && (
          <div className="mb-2">
            <img src={imageSrc} alt="post" className="rounded-lg max-h-64 object-contain mx-auto" />
          </div>
        )}
        <div className="flex items-center gap-4 mt-2">
          <Button className="flex items-center gap-1 px-2 py-1 text-xs" onClick={onLike}>
            <LikeIcon className="w-4 h-4" /> {likes}
          </Button>
          <Button className="flex items-center gap-1 px-2 py-1 text-xs" onClick={() => setShowComment(true)}>
            <CommentIcon className="w-4 h-4" /> {comments}
          </Button>
        </div>
      </div>
      <CommentComponent
        open={showComment}
        onClose={() => setShowComment(false)}
        posterName={posterName}
        avatarSrc={avatarSrc}
        daysSincePosted={daysSincePosted}
        content={content}
        imageSrc={imageSrc}
        comments={[]}
      />
    </>
  );
}; 