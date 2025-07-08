import { TablesInsert } from "@/lib/database.types";

export interface Broadcast {
  id: string;
  title: string;
  message: string;
  date: string;
  recipients: string;
  preview: string;
}

export interface RecipientOptions {
  allStudents: boolean;
  allOrganizations: boolean;
  specificOrganizations: boolean;
  specificSchools: boolean;
}

// --- CLIENT-SIDE FUNCTIONS ---
import { createClient as createClientClient } from "@/lib/supabase/client";
const supabaseClient = createClientClient();

/**
 * Get current user's university ID
 */
export const getCurrentUserUniversityId = async (): Promise<string | null> => {
  try {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (!user) {
      console.error("No authenticated user found");
      return null;
    }

    const { data: studentProfile, error } = await supabaseClient
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
    const { data, error } = await supabaseClient
      .from("broadcast")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error loading broadcasts:", error);
      return [];
    }

    // Transform database data to component format
    const transformedBroadcasts: Broadcast[] = (data || []).map((item: any) => ({
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
      universityid: universityId,
    };

    const { data, error } = await supabaseClient
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
    const { error } = await supabaseClient
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
    const { error } = await supabaseClient
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

// --- SERVER-SIDE FUNCTION ---
"use server";
import { createClient as createClientServer } from "@/lib/supabase/server";

export async function getBroadcastsFor(context: 'student' | 'organization') {
    const supabase = await createClientServer();

    // Get the current user to find their university
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data: student } = await supabase
        .from('student')
        .select('universityid')
        .eq('user_id', user.id)
        .single();

    if (!student || !student.universityid) {
        console.error("Could not find student's university to fetch broadcasts.");
        return [];
    }
    
    // Determine which recipients to fetch based on the context
    const targetRecipients = context === 'student'
        ? ['all', 'students']
        : ['all', 'organizations'];
    
    // Fetch all broadcasts for that university targeting the correct recipients
    const { data: broadcasts, error } = await supabase
        .from('broadcast')
        .select('*')
        .eq('universityid', student.universityid)
        .in('recipient', targetRecipients) // Use .in() to match multiple values
        .order('date', { ascending: false }); // Newest first

    if (error) {
        console.error(`Error fetching broadcasts for context '${context}':`, error.message);
        return [];
    }

    return broadcasts || [];
}