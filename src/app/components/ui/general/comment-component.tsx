import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import { addComment } from "@/lib/actions/comment"; // Import the new action
import type { CommentType } from "@/lib/types/types";

interface CommentComponentProps {
  open: boolean;
  onClose: () => void;
  posterName: string;
  postID: number;
  avatarSrc?: string | null;
  daysSincePosted: number;
  content: string;
  imageSrc?: string;
  initialComments: CommentType[];
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
  open,
  onClose,
  posterName,
  avatarSrc,
  daysSincePosted,
  content,
  imageSrc,
  postID,
  initialComments,
}) => {
  console.log("Received initialComments:", initialComments);
  const [commentList, setCommentList] = React.useState<CommentType[]>(initialComments);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [newComment, setNewComment] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setCommentList(initialComments);
    }
  }, [initialComments, open]);

  const handleSaveComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const tempId = `temp-${Date.now()}`;
    // Optimistic UI Update (optional but recommended)
    // Create a temporary comment to show in the UI immediately
    const tempComment: CommentType = {
      comment_id: tempId, // Temporary key
      comment_text: newComment,
      created_at: new Date().toISOString(),
      author: { fname: 'You', lname: '', picture: null } // Placeholder for author
    };
    setCommentList(prev => [...prev, tempComment]);
    setNewComment("");

    const result = await addComment(postID, newComment);

    if (result.error) {
      alert(result.error);
      // If server fails, remove the temporary comment
      setCommentList(prev => prev.filter(c => c.comment_id !== tempComment.comment_id));
    }
    // On success, revalidatePath on the server will handle getting the real data on next load.

    setIsSubmitting(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-cool-gray/9">
      <div className="bg-action-moss-green/90 rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <h2 className="text-2xl font-bold mb-4 text-neutral-pure-white">
          Comment
        </h2>
        <div className="bg-neutral-pure-white rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <AvatarIcon
              src={avatarSrc}
              alt={posterName}
              className="h-10 w-10 text-base"
            />
            <div>
              <div className="font-semibold text-base text-neutral-muted-olive">
                {posterName}
              </div>
              <div className="text-xs text-gray-400">
                {daysSincePosted} days ago
              </div>
            </div>
          </div>
          <div className="mb-2 text-neutral-charcoal-green text-sm whitespace-pre-line break-words overflow-hidden">
            {content}
          </div>
          {imageSrc && (
            <div className="mb-2">
              <img
                src={imageSrc}
                alt="post"
                className="rounded-lg max-h-64 object-contain mx-auto"
              />
            </div>
          )}
        </div>
        <div className="mb-4 max-h-48 overflow-y-auto">
          {commentList.length === 0 ? (
            <div className="text-neutral-mint-white text-sm">No comments yet.</div>
          ) : (
            commentList.map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-3 bg-neutral-pure-white rounded-lg">
                <AvatarIcon
                  src={c.author?.picture}
                  alt={c.author?.fname || 'User'}
                  className="h-6 w-6 text-base"
                />
                <div>
                  <div className="font-semibold text-xs text-neutral-muted-olive">
                    {c.author?.fname} {c.author?.lname}
                  </div>
                  <div className="text-neutral-charcoal-green text-sm break-words">
                    {c.comment_text}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-pure-white mb-1">
            Your Comment:
          </label>
          <textarea
            className="w-full border rounded-lg p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-secondary-light-moss bg-neutral-pure-white"
            rows={2}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <div className="flex justify-end gap-2">
            <Button
              className="bg-secondary-pale-sage text-neutral-charcoal-green px-4 py-1 rounded hover:bg-secondary-light-moss"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="bg-action-forest-green text-white px-4 py-1 rounded hover:bg-action-moss-green disabled:opacity-50"
              onClick={handleSaveComment}
              disabled={!newComment.trim() || isSubmitting}
              type="button"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
