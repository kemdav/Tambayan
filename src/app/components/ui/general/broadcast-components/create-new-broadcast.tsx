import React from "react";
import { Input } from "../input/input";
import { Button } from "../button";

interface RecipientOptions {
  allStudents: boolean;
  allOrganizations: boolean;
  specificOrganizations: boolean;
  specificSchools: boolean;
}

interface CreateNewBroadcastProps {
  title: string;
  onTitleChange: (val: string) => void;
  message: string;
  onMessageChange: (val: string) => void;
  recipients: RecipientOptions;
  onRecipientsChange: (opts: RecipientOptions) => void;
  attachment?: File | null;
  onAttachmentChange?: (file: File | null) => void;
  onSaveDraft: () => void;
  onSendBroadcast: () => void;
  isSending?: boolean;
}

export function CreateNewBroadcast({
  title,
  onTitleChange,
  message,
  onMessageChange,
  recipients,
  onRecipientsChange,
  attachment,
  onAttachmentChange,
  onSaveDraft,
  onSendBroadcast,
  isSending = false,
}: CreateNewBroadcastProps) {
  return (
    <div className="rounded-2xl border bg-white p-6 flex flex-col gap-4 shadow-sm w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Create New Broadcast</h2>
      <label className="text-sm font-medium">Title</label>
      <Input
        type="text"
        placeholder="Enter broadcast title"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        className="mb-2"
      />
      <label className="text-sm font-medium">Message</label>
      <textarea
        className="border rounded w-full p-2 mb-2 min-h-[80px]"
        placeholder="Type your message here..."
        value={message}
        onChange={e => onMessageChange(e.target.value)}
      />
      <label className="text-sm font-medium">Recipients</label>
      <div className="flex flex-col gap-1 mb-2">
        <label><input type="checkbox" checked={recipients.allStudents} onChange={e => onRecipientsChange({ ...recipients, allStudents: e.target.checked })}/> All Students</label>
        <label><input type="checkbox" checked={recipients.allOrganizations} onChange={e => onRecipientsChange({ ...recipients, allOrganizations: e.target.checked })}/> All Organizations</label>
        <label><input type="checkbox" checked={recipients.specificOrganizations} onChange={e => onRecipientsChange({ ...recipients, specificOrganizations: e.target.checked })}/> Specific Organizations</label>
        <label><input type="checkbox" checked={recipients.specificSchools} onChange={e => onRecipientsChange({ ...recipients, specificSchools: e.target.checked })}/> Specific Schools</label>
      </div>
      <label className="text-sm font-medium">Attachments (Optional)</label>
      <Input
        type="file"
        onChange={e => onAttachmentChange && onAttachmentChange(e.target.files?.[0] || null)}
      />
      {attachment && <span className="text-xs mt-1">{attachment.name}</span>}
      <div className="flex gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onSaveDraft} disabled={isSending}>Save Draft</Button>
        <Button type="button" variant="default" onClick={onSendBroadcast} disabled={isSending}>Send Broadcast</Button>
      </div>
    </div>
  );
} 