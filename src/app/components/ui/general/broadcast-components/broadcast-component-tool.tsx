import * as React from "react";
import { CreateNewBroadcast } from "./create-new-broadcast";
import { BroadcastHistory, Broadcast } from "./broadcast-history";

export function BroadcastComponentTool() {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [recipients, setRecipients] = React.useState({
    allStudents: true,
    allOrganizations: false,
    specificOrganizations: false,
    specificSchools: false,
  });
  const [attachment, setAttachment] = React.useState<File | null>(null);
  const [attachmentPreview, setAttachmentPreview] = React.useState<string | null>(null);
  const [history, setHistory] = React.useState<Broadcast[]>([]);
  const [filter, setFilter] = React.useState("all");
  const [isSending, setIsSending] = React.useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = React.useState<Broadcast | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (attachment && attachment.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => setAttachmentPreview(e.target?.result as string);
      reader.readAsDataURL(attachment);
    } else {
      setAttachmentPreview(null);
    }
  }, [attachment]);

  const handleSaveDraft = () => {
    alert("Draft saved (not implemented)");
  };

  const handleSendBroadcast = () => {
    setIsSending(true);
    let imageData: string | undefined = undefined;
    if (attachment && attachment.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = e => {
        imageData = e.target?.result as string;
        addBroadcast(imageData);
      };
      reader.readAsDataURL(attachment);
    } else {
      addBroadcast(undefined);
    }
  };

  function addBroadcast(imageData?: string) {
    setHistory(prev => [
      {
        id: Date.now().toString(),
        title,
        message,
        date: new Date().toLocaleDateString(),
        recipients: Object.entries(recipients).filter(([k, v]) => v).map(([k]) => k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())).join(", ") || "None",
        preview: message.slice(0, 60) + (message.length > 60 ? "..." : ""),
        attachmentName: attachment?.name,
        attachmentImage: imageData,
      },
      ...prev,
    ]);
    setTitle("");
    setMessage("");
    setAttachment(null);
    setAttachmentPreview(null);
    setIsSending(false);
  }

  const filteredHistory = history.filter(b => {
    if (filter === "all") return true;
    if (filter === "students") return b.recipients.toLowerCase().includes("student");
    if (filter === "organizations") return b.recipients.toLowerCase().includes("organization");
    if (filter === "schools") return b.recipients.toLowerCase().includes("school");
    return true;
  });

  const handleBroadcastClick = (b: Broadcast) => {
    setSelectedBroadcast(b);
    setSelectedImage(b.attachmentImage || null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
      <CreateNewBroadcast
        title={title}
        onTitleChange={setTitle}
        message={message}
        onMessageChange={setMessage}
        recipients={recipients}
        onRecipientsChange={setRecipients}
        attachment={attachment}
        onAttachmentChange={setAttachment}
        onSaveDraft={handleSaveDraft}
        onSendBroadcast={handleSendBroadcast}
        isSending={isSending}
      />
      <BroadcastHistory
        broadcasts={filteredHistory}
        filter={filter}
        onFilterChange={setFilter}
        onBroadcastClick={handleBroadcastClick}
      />
      {/* Modal for broadcast details */}
      {selectedBroadcast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-2 relative flex flex-col">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => { setSelectedBroadcast(null); setSelectedImage(null); }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2 break-words">{selectedBroadcast.title}</h2>
            <div className="mb-2 text-sm text-gray-700 break-words whitespace-pre-line">{selectedBroadcast.message}</div>
            <div className="mb-1 text-xs text-gray-500">Recipients: {selectedBroadcast.recipients}</div>
            <div className="mb-1 text-xs text-gray-500">Date: {selectedBroadcast.date}</div>
            {selectedBroadcast.attachmentName && (
              <div className="mb-1 text-xs text-gray-500">Attachment: {selectedBroadcast.attachmentName}</div>
            )}
            {selectedImage && (
              <div className="mt-2 flex justify-center">
                <img src={selectedImage} alt="attachment" className="max-h-48 rounded shadow" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 