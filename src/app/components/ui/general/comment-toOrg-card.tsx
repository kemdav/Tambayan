"use client";

import React from "react";
import { AvatarIcon } from "./avatar-icon-component";

interface CommentToOrgCardProps {
  commenterName: string;
  commenterAvatarSrc?: string | null;
  daysSinceCommented: number;
  replyText: string;
  postTitle: string;
  postOrg: string;
}

const EllipsisIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="5" cy="12" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="19" cy="12" r="1.5" />
  </svg>
);

export const CommentToOrgCard: React.FC<CommentToOrgCardProps> = ({
  commenterName,
  commenterAvatarSrc,
  daysSinceCommented,
  replyText,
  postTitle,
  postOrg,
}) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);

  if (hidden) return null;

  return (
    <div className="border rounded-2xl p-4 bg-white shadow-sm max-w-2xl w-full mx-auto relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          className="p-1 rounded-full hover:bg-gray-100"
          onClick={() => setShowMenu((v) => !v)}
          aria-label="Comment options"
        >
          <EllipsisIcon className="w-6 h-6" />
        </button>
        {showMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-20">
            <button className="w-full text-left px-4 py-2 hover:bg-secondary-pale-sage" onClick={() => { setHidden(true); setShowMenu(false); }}>Hide Comment</button>
            <button className="w-full text-left px-4 py-2 hover:bg-secondary-pale-sage" onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}>Delete Comment</button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-3 mb-2">
        <AvatarIcon src={commenterAvatarSrc} alt={commenterName} className="h-8 w-8 text-base" />
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-neutral-muted-olive">
            {commenterName} reply to [
            <span className="font-bold">{postTitle}</span>
            ] by [
            <span className="font-bold">{postOrg}</span>
            ]
          </span>
          <span className="text-xs text-gray-400">{daysSinceCommented} days ago</span>
        </div>
      </div>
      <div className="mb-2 text-sm text-gray-700 whitespace-pre-line break-words overflow-hidden">
        {replyText}
      </div>
      <div className="text-xs text-gray-300 text-right">Commented</div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative">
            <h2 className="text-lg font-bold mb-4">Delete Comment?</h2>
            <p className="mb-4">Are you sure you want to delete this comment? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700" onClick={() => { setHidden(true); setShowDeleteConfirm(false); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentToOrgCard; 