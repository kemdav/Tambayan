import * as React from "react";
import { CreateNewBroadcast } from "./create-new-broadcast";
import { BroadcastHistory, Broadcast } from "./broadcast-history";
import { createClient } from "@/lib/supabase/client";
import { TablesInsert } from "@/lib/database.types";

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
  const [attachmentPreview, setAttachmentPreview] = React.useState<
    string | null
  >(null);
  const [history, setHistory] = React.useState<Broadcast[]>([]);
  const [filter, setFilter] = React.useState("all");
  const [isSending, setIsSending] = React.useState(false);
  const [selectedBroadcast, setSelectedBroadcast] =
    React.useState<Broadcast | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const supabase = createClient();

  // Get current user's university ID
  const getCurrentUserUniversityId = async (): Promise<string | null> => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        console.error("No authenticated user found");
        return null;
      }

      const { data: studentProfile, error } = await supabase
        .from("student")
        .select("universityid")
        .eq("user_id", user.id)
        .single();

      if (error || !studentProfile) {
        console.error("Error fetching student profile:", error);
        return null;
      }

      return studentProfile.universityid;
    } catch (error) {
      console.error("Error getting user university ID:", error);
      return null;
    }
  };

  // Load broadcast history from database
  React.useEffect(() => {
    loadBroadcastHistory();
  }, []);

  const loadBroadcastHistory = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("broadcast")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error loading broadcasts:", error);
        return;
      }

      // Transform database data to component format
      const transformedBroadcasts: Broadcast[] = data.map((item: any) => ({
        id: item.date || Date.now().toString(), // Using date as ID since there's no explicit ID field
        title: item.title || "",
        message: item.message || "",
        date: item.date
          ? new Date(item.date).toLocaleDateString()
          : new Date().toLocaleDateString(),
        recipients: item.recipient || "All Students",
        preview:
          (item.message || "").slice(0, 60) +
          ((item.message || "").length > 60 ? "..." : ""),
        attachmentName: item.attachment ? "Attachment" : undefined,
        attachmentImage: item.attachment || undefined,
      }));

      setHistory(transformedBroadcasts);
    } catch (error) {
      console.error("Error loading broadcast history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (attachment && attachment.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setAttachmentPreview(e.target?.result as string);
      reader.readAsDataURL(attachment);
    } else {
      setAttachmentPreview(null);
    }
  }, [attachment]);

  const handleSaveDraft = () => {
    alert("Draft saved (not implemented)");
  };

  const handleSendBroadcast = async () => {
    setIsSending(true);

    try {
      let imageData: string | undefined = undefined;

      if (attachment && attachment.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          imageData = e.target?.result as string;
          await addBroadcastToDatabase(imageData);
        };
        reader.readAsDataURL(attachment);
      } else {
        await addBroadcastToDatabase(undefined);
      }
    } catch (error) {
      console.error("Error sending broadcast:", error);
      alert("Failed to send broadcast. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const addBroadcastToDatabase = async (imageData?: string) => {
    try {
      // Get current user's university ID
      const universityId = await getCurrentUserUniversityId();

      // Prepare recipient string
      const recipientString =
        Object.entries(recipients)
          .filter(([k, v]) => v)
          .map(([k]) =>
            k
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
          )
          .join(", ") || "All Students";

      // Prepare broadcast data for database
      const broadcastData: TablesInsert<"broadcast"> = {
        title: title,
        message: message,
        date: new Date().toISOString(),
        recipient: recipientString,
        attachment: imageData || null,
        universityid: universityId,
      };

      const { data, error } = await supabase
        .from("broadcast")
        .insert(broadcastData)
        .select();

      if (error) {
        console.error("Error inserting broadcast:", error);
        throw error;
      }

      // Add to local state
      const newBroadcast: Broadcast = {
        id: Date.now().toString(),
        title,
        message,
        date: new Date().toLocaleDateString(),
        recipients: recipientString,
        preview: message.slice(0, 60) + (message.length > 60 ? "..." : ""),
        attachmentName: attachment?.name,
        attachmentImage: imageData,
      };

      setHistory((prev) => [newBroadcast, ...prev]);

      // Reset form
      setTitle("");
      setMessage("");
      setAttachment(null);
      setAttachmentPreview(null);

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
    setSelectedImage(b.attachmentImage || null);
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
              onClick={() => {
                setSelectedBroadcast(null);
                setSelectedImage(null);
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
            {selectedBroadcast.attachmentName && (
              <div className="mb-1 text-xs text-gray-500">
                Attachment: {selectedBroadcast.attachmentName}
              </div>
            )}
            {selectedImage && (
              <div className="mt-2 flex justify-center">
                <img
                  src={selectedImage}
                  alt="attachment"
                  className="max-h-48 rounded shadow"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
