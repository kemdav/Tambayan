import { createClient } from "@/lib/supabase/client";

// Define the EventData type to match the tableData structure
export interface EventData {
  eventName: string;
  organization: string;
  date: string;
  location: string;
  status?: string;
  onClickView: () => void;
  onClickEdit: () => void;
}

export interface Option {
  value: string;
  label: string;
}

export interface StatusStyle {
  label: string;
  bgColor: string;
  textColor: string;
}

const supabase = createClient();

/**
 * Fetch all events from the database
 */
export const fetchEvents = async (): Promise<EventData[]> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("eventid, title, orgid, date, location, status");

    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => ({
      eventName: event.title || "Untitled Event",
      organization: event.orgid || "Unknown Org",
      date: event.date ? new Date(event.date).toLocaleDateString() : "-",
      location: event.location || "-",
      status: event.status || "-",
      onClickView: () => alert(`View ${event.title}`),
      onClickEdit: () => alert(`Edit ${event.title}`),
    }));

    return mapped;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

/**
 * Fetch events by organization
 */
export const fetchEventsByOrganization = async (orgId: string): Promise<EventData[]> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("eventid, title, orgid, date, location, status")
      .eq("orgid", orgId);

    if (error) {
      console.error("Error fetching events by organization:", error);
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => ({
      eventName: event.title || "Untitled Event",
      organization: event.orgid || "Unknown Org",
      date: event.date ? new Date(event.date).toLocaleDateString() : "-",
      location: event.location || "-",
      status: event.status || "-",
      onClickView: () => alert(`View ${event.title}`),
      onClickEdit: () => alert(`Edit ${event.title}`),
    }));

    return mapped;
  } catch (error) {
    console.error("Error fetching events by organization:", error);
    return [];
  }
};

/**
 * Fetch events by status
 */
export const fetchEventsByStatus = async (status: string): Promise<EventData[]> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("eventid, title, orgid, date, location, status")
      .eq("status", status);

    if (error) {
      console.error("Error fetching events by status:", error);
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => ({
      eventName: event.title || "Untitled Event",
      organization: event.orgid || "Unknown Org",
      date: event.date ? new Date(event.date).toLocaleDateString() : "-",
      location: event.location || "-",
      status: event.status || "-",
      onClickView: () => alert(`View ${event.title}`),
      onClickEdit: () => alert(`Edit ${event.title}`),
    }));

    return mapped;
  } catch (error) {
    console.error("Error fetching events by status:", error);
    return [];
  }
};

/**
 * Fetch a single event by ID
 */
export const fetchEventById = async (eventId: string): Promise<EventData | null> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("eventid, title, orgid, date, location, status")
      .eq("eventid", eventId)
      .single();

    if (error) {
      console.error("Error fetching event by ID:", error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Map event to tableData format
    const mapped: EventData = {
      eventName: data.title || "Untitled Event",
      organization: data.orgid || "Unknown Org",
      date: data.date ? new Date(data.date).toLocaleDateString() : "-",
      location: data.location || "-",
      status: data.status || "-",
      onClickView: () => alert(`View ${data.title}`),
      onClickEdit: () => alert(`Edit ${data.title}`),
    };

    return mapped;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return null;
  }
};

/**
 * Update event status
 */
export const updateEventStatus = async (eventId: string, status: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("events")
      .update({ status })
      .eq("eventid", eventId);

    if (error) {
      console.error("Error updating event status:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error updating event status:", error);
    throw error;
  }
};

/**
 * Delete an event
 */
export const deleteEvent = async (eventId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("eventid", eventId);

    if (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

/**
 * Create a new event
 */
export const createEvent = async (eventData: {
  title: string;
  orgid: string;
  date: string;
  location: string;
  status?: string;
}): Promise<void> => {
  try {
    const { error } = await supabase
      .from("events")
      .insert(eventData);

    if (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

/**
 * Get sample organization options (for filter dropdown)
 */
export const getSampleOptions = (): Option[] => [
  { value: "cs-society", label: "Computer Science Society" },
  { value: "math-club", label: "Math Club" },
  { value: "debate-club", label: "Debate Club" },
];

/**
 * Get sample status styles (for status badges)
 */
export const getSampleStatuses = (): StatusStyle[] => [
  { label: "Upcoming", bgColor: "bg-yellow-100", textColor: "text-yellow-800" },
  { label: "Ongoing", bgColor: "bg-green-100", textColor: "text-green-800" },
  { label: "Completed", bgColor: "bg-blue-100", textColor: "text-blue-800" },
]; 