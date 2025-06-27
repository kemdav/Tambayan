import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";

interface CommentComponentProps {
  open: boolean;
  onClose: () => void;
  posterName: string;
  avatarSrc?: string | null;
  daysSincePosted: number;
  content: string;
  imageSrc?: string;
  comments?: { name: string; avatarSrc?: string | null; text: string; }[];
}

export const CommentComponent: React.FC<CommentComponentProps> = ({
  open,
  onClose,
  posterName,
  avatarSrc,
  daysSincePosted,
  content,
  imageSrc,
  comments = [],
}) => {
  const [comment, setComment] = React.useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-900">Comment</h2>
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <AvatarIcon src={avatarSrc} alt={posterName} className="h-10 w-10 text-base" />
            <div>
              <div className="font-semibold text-base text-gray-800">{posterName}</div>
              <div className="text-xs text-gray-400">{daysSincePosted} days ago</div>
            </div>
          </div>
          <div className="mb-2 text-gray-800 text-sm whitespace-pre-line break-words overflow-hidden">{content}</div>
          {imageSrc && (
            <div className="mb-2">
              <img src={imageSrc} alt="post" className="rounded-lg max-h-64 object-contain mx-auto" />
            </div>
          )}
        </div>
        <div className="mb-4 max-h-48 overflow-y-auto">
          {comments.length === 0 ? (
            <div className="text-gray-400 text-sm">No comments yet.</div>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="flex items-start gap-2 mb-3">
                <AvatarIcon src={c.avatarSrc} alt={c.name} className="h-8 w-8 text-base" />
                <div>
                  <div className="font-semibold text-xs text-gray-800">{c.name}</div>
                  <div className="text-gray-700 text-sm break-words">{c.text}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment:</label>
          <textarea
            className="w-full border rounded-lg p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            rows={2}
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-1 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              onClick={() => { setComment(""); }}
              disabled={!comment.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 