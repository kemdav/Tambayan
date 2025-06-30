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
  isDetailed = true,
}) => {
  const [showComment, setShowComment] = React.useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [editTitle, setEditTitle] = useState(initialTitle || "");
  const [editContent, setEditContent] = useState(initialContent);
  const [editOrg, setEditOrg] = useState(orgOptions.find(o => o.label === initialOrgLabel)?.value || null);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editImage, setEditImage] = useState<string | undefined>(initialImageSrc);
  const [editEvent, setEditEvent] = useState(initialEvent || "");
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

  if (hidden) return null;

  return (
    <>
      <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-2xl w-full mx-auto relative">
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
          <AvatarIcon src={avatarSrc} alt={posterName} className="h-8 w-8 text-base" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm text-neutral-muted-olive flex items-center gap-2">
              {isDetailed ? (
                <>
                  {posterName}{recipient ? ` to ${recipient}` : ''}
                </>
              ) : (
                posterName
              )}
            </span>
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
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Edit Post</h2>
            <Input
              type="text"
              placeholder="Post Title"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              className="mb-2"
            />
            <label className="text-sm font-medium text-neutral-muted-olive">Post Content</label>
            <FormattableInput
              ref={contentRef}
              value={editContent}
              onChange={val => setEditContent(val as string)}
              isFormattable={true}
              multiline={true}
              placeholder="What's happening in your organization?"
              className="mb-8"
            />
            <label className="text-sm font-medium text-neutral-muted-olive mt-4">Select Organization:</label>
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
              onSelect={setEditOrg}
            />
            <div className="flex items-center gap-6 border-b pb-2 mt-2">
              <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowPhoto(v => !v)}>Photo</button>
              <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowEvent(v => !v)}>Event</button>
              <button type="button" className="text-neutral-cool-gray hover:underline" onClick={() => setShowTag(v => !v)}>Tag</button>
              <div className="flex-1" />
            </div>
            {showPhoto && (
              <div className="mt-2">
                <Input type="file" accept="image/*" onChange={e => {
                  const file = e.target.files?.[0] || null;
                  setEditPhoto(file);
                  setEditImage(file ? URL.createObjectURL(file) : undefined);
                }} />
                {editPhoto && <span className="text-xs ml-2">{editPhoto.name}</span>}
                {editImage && <img src={editImage} alt="edit" className="rounded-lg max-h-40 mb-4 mx-auto" />}
              </div>
            )}
            {showEvent && (
              <div className="mt-2">
                <Input type="text" placeholder="Event Name" value={editEvent} onChange={e => setEditEvent(e.target.value)} />
              </div>
            )}
            {showTag && (
              <div className="mt-2 flex gap-2 items-center flex-wrap">
                <input
                  type="text"
                  className="border rounded-lg p-2 text-sm"
                  placeholder="Add tag and press Enter or Space"
                  value={editTagInput}
                  onChange={e => setEditTagInput(e.target.value.replace(/,/g, ""))}
                  onKeyDown={e => {
                    if ((e.key === "Enter" || e.key === " ") && editTagInput.trim()) {
                      const trimmed = editTagInput.trim();
                      if (trimmed && !editTags.includes(trimmed)) {
                        setEditTags([...editTags, trimmed]);
                      }
                      setEditTagInput("");
                      e.preventDefault();
                    }
                  }}
                />
                <Button type="button" className="px-3 py-1" onClick={() => {
                  const trimmed = editTagInput.trim();
                  if (trimmed && !editTags.includes(trimmed)) {
                    setEditTags([...editTags, trimmed]);
                  }
                  setEditTagInput("");
                }}>Add</Button>
                {editTags.map((tag) => (
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
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="ghost" onClick={() => setShowEdit(false)}>Cancel</Button>
              <Button
                variant="default"
                onClick={() => {
                  setShowEdit(false);
                  // Save changes to post (update displayed post fields)
                  setDisplayTitle(editTitle);
                  setDisplayContent(contentRef.current ? contentRef.current.innerHTML : editContent);
                  setDisplayImage(editImage);
                  setDisplayTags(editTags);
                  setDisplayEvent(editEvent);
                  setDisplayOrg(orgOptions.find(o => o.value === editOrg)?.label || "");
                }}
              >
                Save
              </Button>
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