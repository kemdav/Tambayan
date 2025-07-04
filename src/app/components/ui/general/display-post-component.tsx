import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import LikeIcon from "@/app/components/icons/LikeIcon";
import CommentIcon from "@/app/components/icons/CommentIcon";
import { CommentComponent } from "./comment-component";
import { Popover, PopoverTrigger, PopoverContent } from "./dropdown/popover";
import { useState } from "react";
import DropdownRole from "./dropdown/dropdown-role";
import { Input } from "./input/input";
import { FormattableInput } from "./input/FormattableInput";
import { CreatePostComponent } from "./create-post-component";
import { DateTimePicker } from "./date-picker/date-picker-component";

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
  recipient?: string;
  isDetailed?: boolean;
  eventLocation?: string;
  eventDate?: string;
  registrationPeriod?: string;
  onAvatarClicked?:()=>void,
}

const EllipsisIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

const orgOptions = [
  { value: "icpep", label: "ICPEP" },
  { value: "jpia", label: "JPIA" },
  { value: "ces", label: "CES" },
];

export const DisplayPostComponent: React.FC<DisplayPostComponentProps> = ({
  posterName,
  event: initialEvent,
  avatarSrc,
  daysSincePosted,
  title: initialTitle,
  content: initialContent,
  imageSrc: initialImageSrc,
  likes,
  comments,
  tags: initialTags = [],
  onLike,
  onComment,
  orgLabel: initialOrgLabel,
  recipient,
  isDetailed = false,
  eventLocation,
  eventDate,
  registrationPeriod,
  onAvatarClicked,
}) => {
  const [showComment, setShowComment] = React.useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [editTitle, setEditTitle] = useState(initialTitle || "");
  const [editContent, setEditContent] = useState(initialContent);
  const [editOrg, setEditOrg] = useState(orgOptions.find(o => o.label === initialOrgLabel)?.value || null);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editPostType, setEditPostType] = useState(initialEvent ? "event" : "default");
  const [editRegistrationStart, setEditRegistrationStart] = useState<Date | undefined>(undefined);
  const [editRegistrationEnd, setEditRegistrationEnd] = useState<Date | undefined>(undefined);
  const [editEventLocation, setEditEventLocation] = useState(eventLocation || "");
  const [editImage, setEditImage] = useState<string | undefined>(initialImageSrc);
  const [editTags, setEditTags] = useState<string[]>(initialTags);
  const [editTagInput, setEditTagInput] = useState("");
  const [showPhoto, setShowPhoto] = useState(!!initialImageSrc);
  const [showEvent, setShowEvent] = useState(!!initialEvent);
  const [showTag, setShowTag] = useState(initialTags.length > 0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [displayTitle, setDisplayTitle] = useState(initialTitle || "");
  const [displayContent, setDisplayContent] = useState(initialContent);
  const [displayImage, setDisplayImage] = useState<string | undefined>(initialImageSrc);
  const [displayEvent, setDisplayEvent] = useState(initialEvent || "");
  const [displayTags, setDisplayTags] = useState<string[]>(initialTags);
  const [displayOrg, setDisplayOrg] = useState(initialOrgLabel || "");
  const [displayRegistrationPeriod, setDisplayRegistrationPeriod] = useState<string | undefined>(registrationPeriod);
  const [displayRecipient, setDisplayRecipient] = useState(recipient);
  const [displayEventLocation, setDisplayEventLocation] = useState(eventLocation || "");
  const [editImagePreview, setEditImagePreview] = useState<string | undefined>(initialImageSrc);

  React.useEffect(() => {
    if (editPhoto) {
      const url = URL.createObjectURL(editPhoto);
      setEditImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setEditImagePreview(initialImageSrc);
    }
  }, [editPhoto, initialImageSrc]);

  if (hidden) return null;

  return (
    <>
      <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-4xl w-full mx-auto relative">
        <div className="absolute top-4 right-4 z-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Post options">
                <EllipsisIcon className="w-6 h-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              <div className="flex flex-col divide-y">
                <button className="px-4 py-2 text-left hover:bg-secondary-pale-sage" onClick={() => setShowEdit(true)}>
                  Edit Post
                </button>
                <button className="px-4 py-2 text-left hover:bg-secondary-pale-sage" onClick={() => setHidden(true)}>
                  Hide Post
                </button>
                <button className="px-4 py-2 text-left text-red-600 hover:bg-secondary-pale-sage" onClick={() => setShowDeleteConfirm(true)}>
                  Delete Post
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <AvatarIcon src={avatarSrc} alt={posterName} className="h-8 w-8 text-base" isClickable={true} onAvatarClicked={onAvatarClicked}/>
          <div className="flex flex-col">
            {!isDetailed && displayRecipient && (
              <span className="font-semibold text-sm text-neutral-muted-olive flex items-center gap-2">
                {posterName} to {displayRecipient.toUpperCase()}
              </span>
            )}
            <span className="text-xs text-gray-400">{daysSincePosted} days ago</span>
          </div>
        </div>
        {displayTitle && (
          <div className="mb-2 text-xl font-bold text-gray-800">
            {displayTitle}{displayOrg ? `: ${displayOrg}` : ""}
          </div>
        )}
        {displayEvent && (
          <div className="mb-2 text-base">
            <span className="font-bold">Event:</span> {displayEvent}
          </div>
        )}
        {displayEventLocation && (
          <div className="mb-1 text-sm text-gray-700">
            <span className="font-semibold">Location:</span> {displayEventLocation}
          </div>
        )}
        {eventDate && (
          <div className="mb-1 text-sm text-gray-700">
            <span className="font-semibold">Date:</span> {eventDate}
          </div>
        )}
        {displayRegistrationPeriod && (
          <div className="mb-2 text-sm text-gray-700">
            <span className="font-semibold">Registration Period:</span> {displayRegistrationPeriod}
          </div>
        )}
        <div
          className="mb-2 text-sm text-gray-700 whitespace-pre-line break-words overflow-hidden"
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
        {displayTags.length > 0 && (
          <div className="flex gap-2 mb-2 flex-wrap">
            {displayTags.map((tag) => (
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
        {displayImage && (
          <div className="mb-2">
            <img src={displayImage} alt="post" className="rounded-lg max-h-64 object-contain mx-auto" />
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
        content={displayContent}
        imageSrc={displayImage}
        comments={[]}
      />
      {showEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-2 relative flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => setShowEdit(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <CreatePostComponent
              postType={editPostType}
              onPostTypeChange={setEditPostType}
              org={editOrg}
              onOrgChange={setEditOrg}
              title={editTitle}
              onTitleChange={setEditTitle}
              content={editContent}
              onContentChange={setEditContent}
              tags={editTags}
              tagInput={editTagInput}
              onTagInputChange={setEditTagInput}
              onAddTag={() => {
                const trimmed = editTagInput.trim();
                if (trimmed && !editTags.includes(trimmed)) {
                  setEditTags([...editTags, trimmed]);
                }
                setEditTagInput("");
              }}
              onRemoveTag={tag => setEditTags(editTags.filter(t => t !== tag))}
              eventLocation={editEventLocation}
              onEventLocationChange={setEditEventLocation}
              registrationStart={editRegistrationStart}
              onRegistrationStartChange={setEditRegistrationStart}
              registrationEnd={editRegistrationEnd}
              onRegistrationEndChange={setEditRegistrationEnd}
              postButtonText="Save Changes"
              isEditMode={true}
              onPost={() => {
                setDisplayTitle(editTitle);
                setDisplayContent(editContent);
                setDisplayTags(editTags);
                setDisplayOrg(orgOptions.find(o => o.value === editOrg)?.label || "");
                setDisplayEvent(editPostType === "event" ? editTitle : "");
                setDisplayImage(editPhoto ? editImagePreview : initialImageSrc);
                setDisplayRegistrationPeriod(
                  editPostType === "event" && editRegistrationStart && editRegistrationEnd
                    ? `${editRegistrationStart.toLocaleString()} - ${editRegistrationEnd.toLocaleString()}`
                    : undefined
                );
                if (editPostType === "default") {
                  setDisplayOrg("");
                  setDisplayEvent("");
                  setDisplayRecipient(orgOptions.find(o => o.value === editOrg)?.label || undefined);
                }
                if (editPostType === "event") {
                  setDisplayEventLocation(editEventLocation);
                }
                setShowEdit(false);
              }}
            />
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-muted-olive mb-1">Edit Image</label>
              <input
                type="file"
                accept="image/*"
                className="cursor-pointer border rounded px-3 py-2 bg-gray-100 hover:bg-secondary-light-moss hover:text-white text-sm font-medium transition-colors"
                onChange={e => {
                  const file = e.target.files?.[0] || null;
                  setEditPhoto(file);
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setEditImagePreview(url);
                  } else {
                    setEditImagePreview(initialImageSrc);
                  }
                  e.target.value = "";
                }}
              />
              {editImagePreview && (
                <img src={editImagePreview} alt="edit preview" className="rounded-lg max-h-40 mt-2 mx-auto" />
              )}
            </div>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-bold mb-4">Delete Post?</h2>
            <p className="mb-4">Are you sure you want to delete this post? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              <Button variant="destructive" onClick={() => { setShowDeleteConfirm(false); setHidden(true); }}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 