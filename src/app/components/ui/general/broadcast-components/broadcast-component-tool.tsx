import * as React from "react";
import { CreateNewBroadcast } from "./create-new-broadcast";
import { BroadcastHistory, Broadcast } from "./broadcast-history";
import {
  loadBroadcastHistory,
  addBroadcastToDatabase,
  saveDraftBroadcast,
  type RecipientOptions,
} from "@/lib/actions/broadcast";

export function BroadcastComponentTool() {
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [recipients, setRecipients] = React.useState<RecipientOptions>({
    allStudents: true,
    allOrganizations: false,
    specificOrganizations: false,
    specificSchools: false,
  });
  const [history, setHistory] = React.useState<Broadcast[]>([]);
  const [filter, setFilter] = React.useState("all");
  const [isSending, setIsSending] = React.useState(false);
  const [selectedBroadcast, setSelectedBroadcast] =
    React.useState<Broadcast | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Load broadcast history from database
  React.useEffect(() => {
    loadBroadcastHistoryFromActions();
  }, []);

  const loadBroadcastHistoryFromActions = async () => {
    try {
      setIsLoading(true);
      const broadcasts = await loadBroadcastHistory();
      setHistory(broadcasts);
    } catch (error) {
      console.error("Error loading broadcast history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    try {
      await saveDraftBroadcast();
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
      alert("Failed to save draft. Please try again.");
    }
  };

  const handleSendBroadcast = async () => {
    setIsSending(true);

    try {
      await addBroadcastFromActions();
    } catch (error) {
      console.error("Error sending broadcast:", error);
      alert("Failed to send broadcast. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const addBroadcastFromActions = async () => {
    try {
      const newBroadcast = await addBroadcastToDatabase(
        title,
        message,
        recipients
      );

      // Add to local state
      setHistory((prev) => [newBroadcast, ...prev]);

      // Reset form
      setTitle("");
      setMessage("");

      alert("Broadcast sent successfully!");
    } catch (error) {
      console.error("Error adding broadcast to database:", error);
      throw error;
    }
  };

  const filteredHistory = history.filter((b) => {
    if (filter === "all") return true;
    if (filter === "students")
      return b.recipients.toLowerCase().includes("student");
    if (filter === "organizations")
      return b.recipients.toLowerCase().includes("organization");
    if (filter === "schools")
      return b.recipients.toLowerCase().includes("school");
    return true;
  });

  const handleBroadcastClick = (b: Broadcast) => {
    setSelectedBroadcast(b);
    // No attachment image
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
        <div className="flex-1">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="w-full max-w-md">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl">
      <CreateNewBroadcast
        title={title}
        onTitleChange={setTitle}
        message={message}
        onMessageChange={setMessage}
        recipients={recipients}
        onRecipientsChange={setRecipients}
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
              onClick={() => {
                setSelectedBroadcast(null);
                // No attachment image
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2 break-words">
              {selectedBroadcast.title}
            </h2>
            <div className="mb-2 text-sm text-gray-700 break-words whitespace-pre-line">
              {selectedBroadcast.message}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              Recipients: {selectedBroadcast.recipients}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              Date: {selectedBroadcast.date}
            </div>
            {/* No attachment UI */}
          </div>
        </div>
      )}
    </div>
  );
}
