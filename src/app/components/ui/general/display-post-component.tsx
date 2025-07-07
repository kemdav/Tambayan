"use client";
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
import { deletePost, updatePost } from "@/lib/actions/post";
import { togglePostLike } from "@/lib/actions/like";
import { CommentType } from "@/lib/types/types";

interface DisplayPostComponentProps {
  posterName: string;
  postID: string; // <-- ADD THIS
  currentUserID?: string;
   canAdministerPost?: boolean; 
  event?: string;
  posterUserID?: string | null;
  avatarSrc?: string | null;
  daysSincePosted: number;
  title?: string | null;
  content: string;
  imageSrc?: string | null;
  likes: number;
  comments: CommentType[];
  tags?: string[];
  initialHasLiked?: boolean;
  posterID: string;
  onLike?: () => void;
  onComment?: () => void;
  orgLabel?: string;
  recipient?: string;
  isDetailed?: boolean;
  eventLocation?: string;
  eventDate?: string;
  registrationPeriod?: string;
  onAvatarClicked?: () => void,
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
  postID,
  canAdministerPost = false,
  currentUserID,
  tags: initialTags = [],
  onLike,
  onComment,
  orgLabel: initialOrgLabel,
  posterUserID,
  recipient,
  isDetailed = false,
  eventLocation,
  eventDate,
  likes: initialLikes,
    initialHasLiked = false,
  registrationPeriod,
  onAvatarClicked,
}) => {



  const [showComment, setShowComment] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hidden, setHidden] = useState(false);
  const canEditOrDelete = (posterUserID && currentUserID && posterUserID === currentUserID) || canAdministerPost;
  const [editTitle, setEditTitle] = useState(initialTitle || "");
  const [editContent, setEditContent] = useState(initialContent);
  const [editOrg, setEditOrg] = useState(orgOptions.find(o => o.label === initialOrgLabel)?.value || null);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editPostType, setEditPostType] = useState(initialEvent ? "event" : "default");
  const [editRegistrationStart, setEditRegistrationStart] = useState<Date | undefined>(undefined);
  const [editRegistrationEnd, setEditRegistrationEnd] = useState<Date | undefined>(undefined);
  const [editEventLocation, setEditEventLocation] = useState(eventLocation || "");
  const [editImage, setEditImage] = useState(initialImageSrc ?? "");
  const [editTags, setEditTags] = useState<string[]>(initialTags);
  const [editTagInput, setEditTagInput] = useState("");
  const [showPhoto, setShowPhoto] = useState(!!initialImageSrc);
  const [showEvent, setShowEvent] = useState(!!initialEvent);
  const [showTag, setShowTag] = useState(initialTags.length > 0);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [displayTitle, setDisplayTitle] = useState(initialTitle || "");
  const [displayContent, setDisplayContent] = useState(initialContent);
  const [displayImage, setDisplayImage] = useState<string | null | undefined>(initialImageSrc);
  const [displayEvent, setDisplayEvent] = useState(initialEvent || "");
  const [displayTags, setDisplayTags] = useState<string[]>(initialTags);
  const [displayOrg, setDisplayOrg] = useState(initialOrgLabel || "");
  const [displayRegistrationPeriod, setDisplayRegistrationPeriod] = useState<string | undefined>(registrationPeriod);
  const [displayRecipient, setDisplayRecipient] = useState(recipient);
  const [displayEventLocation, setDisplayEventLocation] = useState(eventLocation || "");
  const [editImagePreview, setEditImagePreview] = useState(initialImageSrc || "");
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
    const [hasLiked, setHasLiked] = useState(initialHasLiked);
    const [isLikeSubmitting, setIsLikeSubmitting] = useState(false);



  //console.log(`--- Post ID: ${postID} ---`);
  //console.log(`currentUserID:`, currentUserID, `(${typeof currentUserID})`);
  //console.log(`posterUserID:`, posterUserID, `(${typeof posterUserID})`);
  //console.log(`Are they equal?`, currentUserID === posterUserID);
  //console.log(`canEditOrDelete:`, canEditOrDelete);

  React.useEffect(() => {
    if (editPhoto) {
      const url = URL.createObjectURL(editPhoto);
      setEditImagePreview(url);
      return () => URL.revokeObjectURL(url);
    } else if (removeExistingImage) { // If removing existing, clear preview
      setEditImagePreview("");
    } else {
      setEditImagePreview(initialImageSrc ?? "");
    }
  }, [editPhoto, initialImageSrc, removeExistingImage]);

  const handleDelete = async () => {
    setIsSubmitting(true);
    const result = await deletePost(Number(postID));
    setIsSubmitting(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
      setShowDeleteConfirm(false); // Close modal even on error
    } else {
      // On success, RLS on the server will revalidate the path.
      // The post will disappear from the list automatically.
      // We don't even need `setHidden(true)` anymore.
      setShowDeleteConfirm(false);
    }
  };

  const handleLike = async () => {
        if (isLikeSubmitting) return;
        setIsLikeSubmitting(true);

        // Optimistic UI Update: Update the UI immediately for a snappy feel
        setHasLiked(!hasLiked);
        setLikeCount(hasLiked ? likeCount - 1 : likeCount + 1);

        const result = await togglePostLike(Number(postID), hasLiked);

        // If the server fails, revert the optimistic update
        if (result.error) {
            alert(result.error);
            setHasLiked(hasLiked); // Revert to original state
            setLikeCount(likeCount); // Revert to original count
        }
        setIsLikeSubmitting(false);
    };

  const handleSaveChanges = async () => {
    setIsSubmitting(true);

    // Create FormData to send to the server action
    const formData = new FormData();
    formData.append('postId', postID);
    formData.append('title', editTitle);
    formData.append('content', editContent);
    // Note: We are not handling image updates in this pass for simplicity.

    if (editPhoto) {
      formData.append('photoFile', editPhoto);
    } else if (removeExistingImage && initialImageSrc) { // Only send flag if there was an existing image to remove
      formData.append('removeImage', 'true');
    }

    const result = await updatePost(formData);
    setIsSubmitting(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      // Update local state to reflect changes after successful save
      setDisplayTitle(editTitle);
      setDisplayContent(editContent);
      if (editPhoto) {
        setDisplayImage(editImagePreview); // Set to new image preview URL
        setEditPhoto(null); // Clear the file input state after successful upload
      } else if (removeExistingImage) {
        setDisplayImage(null); // Clear image from display
        setRemoveExistingImage(false);
      }
      setShowEdit(false);
    }
  };


  if (hidden) return null;

  console.log(`[DisplayPostComponent] Post ID: ${postID}`);
  console.log(`[DisplayPostComponent] initialImageSrc prop received:`, initialImageSrc, `(Type: ${typeof initialImageSrc})`);
  console.log(`[DisplayPostComponent] displayImage state value:`, displayImage, `(Type: ${typeof displayImage})`);
  console.log(`[DisplayPostComponent] Is displayImage truthy for rendering?`, !!displayImage);

  return (
    <>
      <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-4xl w-full mx-auto relative">
        <div className="absolute top-4 right-4 z-10">
          {canEditOrDelete && (
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
            </Popover>)}
        </div>
        <div className="flex items-center gap-3 mb-2">
          <AvatarIcon src={avatarSrc} alt={posterName} className="h-8 w-8 text-base" isClickable={true} onAvatarClicked={onAvatarClicked} />
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
          <Button className="flex items-center gap-1 px-2 py-1 text-xs"
                onClick={handleLike}
                disabled={isLikeSubmitting}>
            <LikeIcon className="w-4 h-4" /> {likeCount}
          </Button>
          <Button className="flex items-center gap-1 px-2 py-1 text-xs" onClick={() => setShowComment(true)}>
            <CommentIcon className="w-4 h-4" /> {comments.length}
          </Button>
        </div>
      </div>
      <CommentComponent
        open={showComment}
        onClose={() => setShowComment(false)}
        posterName={posterName}
        postID={Number(postID)}
        avatarSrc={avatarSrc}
        daysSincePosted={daysSincePosted}
        content={displayContent}
         initialComments={comments}
        imageSrc={displayImage ?? ""}
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
              onPost={handleSaveChanges}
              isSubmitting={isSubmitting}
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
                  setRemoveExistingImage(false); // If new file selected, don't remove existing
                  e.target.value = "";
                }}
              />
              {(initialImageSrc || editImagePreview) && ( // Show checkbox if there's an initial image or a new one selected
                <label className="flex items-center mt-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={removeExistingImage}
                    onChange={(e) => {
                      setRemoveExistingImage(e.target.checked);
                      if (e.target.checked) {
                        setEditPhoto(null); // If checking remove, clear any pending new photo
                        // editImagePreview will be cleared by the useEffect
                      } else {
                        // editImagePreview will be reset by the useEffect
                      }
                    }}
                    className="mr-2"
                  />
                  Remove current image
                </label>
              )}
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
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)} disabled={isSubmitting}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 