import { createClient } from "@/lib/supabase/client";
import { TablesInsert } from "@/lib/database.types";

export interface Broadcast {
  id: string;
  title: string;
  message: string;
  date: string;
  recipients: string;
  preview: string;
  attachmentName?: string;
  attachmentImage?: string;
}

export interface RecipientOptions {
  allStudents: boolean;
  allOrganizations: boolean;
  specificOrganizations: boolean;
  specificSchools: boolean;
}

const supabase = createClient();

/**
 * Get current user's university ID
 */
export const getCurrentUserUniversityId = async (): Promise<string | null> => {
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

/**
 * Load broadcast history from database
 */
export const loadBroadcastHistory = async (): Promise<Broadcast[]> => {
  try {
    const { data, error } = await supabase
      .from("broadcast")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error loading broadcasts:", error);
      return [];
    }

    // Transform database data to component format
    const transformedBroadcasts: Broadcast[] = data.map((item: any) => ({
      id: item.date || Date.now().toString(), // Using date as ID since there's no explicit ID
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

    return transformedBroadcasts;
  } catch (error) {
    console.error("Error loading broadcast history:", error);
    return [];
  }
};

/**
 * Add a new broadcast to the database
 */
export const addBroadcastToDatabase = async (
  title: string,
  message: string,
  recipients: RecipientOptions,
  attachment?: File | null,
  imageData?: string
): Promise<Broadcast> => {
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

    // Return transformed broadcast data
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

    return newBroadcast;
  } catch (error) {
    console.error("Error adding broadcast to database:", error);
    throw error;
  }
};

/**
 * Save draft broadcast (placeholder for future implementation)
 */
export const saveDraftBroadcast = async (): Promise<void> => {
  // TODO: Implement draft saving functionality
  console.log("Draft saving not implemented yet");
};

/**
 * Delete a broadcast from the database
 */
export const deleteBroadcast = async (broadcastId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("broadcast")
      .delete()
      .eq("date", broadcastId); // Using date as identifier since there's no explicit ID

    if (error) {
      console.error("Error deleting broadcast:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error deleting broadcast:", error);
    throw error;
  }
};

/**
 * Update a broadcast in the database
 */
export const updateBroadcast = async (
  broadcastId: string,
  updates: Partial<TablesInsert<"broadcast">>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("broadcast")
      .update(updates)
      .eq("date", broadcastId); // Using date as identifier since there's no explicit ID

    if (error) {
      console.error("Error updating broadcast:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error updating broadcast:", error);
    throw error;
  }
}; 