import { createClient } from "@/lib/supabase/client";

// Define the EventData type to match the tableData structure
export interface EventData {
  eventid: string;
  eventName: string;
  organization: string; // orgid for debugging
  orgname?: string; // joined organization name
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

type EventWithOrg = {
  eventid: any;
  title: any;
  orgid: any;
  date: any;
  location: any;
  status: any;
  organizations?: { orgname?: string }[];
};

const supabase = createClient();

/**
 * Fetch all events from the database
 */
export const fetchEvents = async (): Promise<EventData[]> => {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("eventid, title, orgid, date, location, status, organizations:orgid (orgname)");

    if (error) {
      console.error("Error fetching events:", JSON.stringify(error, null, 2));
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => {
      const e = event as EventWithOrg;
      return {
        eventid: e.eventid || "",
        eventName: e.title || "Untitled Event",
        organization: e.orgid || "Unknown Org", // orgid for debugging
        orgname:
          Array.isArray(e.organizations)
            ? (e.organizations as { orgname?: string }[])[0]?.orgname || "Unknown Org"
            : (e.organizations as { orgname?: string } | undefined)?.orgname || "Unknown Org",
        date: e.date ? new Date(e.date).toLocaleDateString() : "-",
        location: e.location || "-",
        status: e.status || "-",
        onClickView: () => alert(`View ${e.title}`),
        onClickEdit: () => alert(`Edit ${e.title}`),
      };
    });

    return mapped;
  } catch (error) {
    console.error("Error fetching events:", JSON.stringify(error, null, 2));
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
      .select("eventid, title, orgid, date, location, status, organizations:orgid (orgname)")
      .eq("orgid", orgId);

    if (error) {
      console.error("Error fetching events by organization:", JSON.stringify(error, null, 2));
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => {
      const e = event as EventWithOrg;
      return {
        eventid: e.eventid || "",
        eventName: e.title || "Untitled Event",
        organization: e.orgid || "Unknown Org", // orgid for debugging
        orgname:
          Array.isArray(e.organizations)
            ? (e.organizations as { orgname?: string }[])[0]?.orgname || "Unknown Org"
            : (e.organizations as { orgname?: string } | undefined)?.orgname || "Unknown Org",
        date: e.date ? new Date(e.date).toLocaleDateString() : "-",
        location: e.location || "-",
        status: e.status || "-",
        onClickView: () => alert(`View ${e.title}`),
        onClickEdit: () => alert(`Edit ${e.title}`),
      };
    });

    return mapped;
  } catch (error) {
    console.error("Error fetching events by organization:", JSON.stringify(error, null, 2));
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
      .select("eventid, title, orgid, date, location, status, organizations:orgid (orgname)")
      .eq("status", status);

    if (error) {
      console.error("Error fetching events by status:", JSON.stringify(error, null, 2));
      return [];
    }

    // Map events to tableData format
    const mapped: EventData[] = (data || []).map((event) => {
      const e = event as EventWithOrg;
      return {
        eventid: e.eventid || "",
        eventName: e.title || "Untitled Event",
        organization: e.orgid || "Unknown Org", // orgid for debugging
        orgname:
          Array.isArray(e.organizations)
            ? (e.organizations as { orgname?: string }[])[0]?.orgname || "Unknown Org"
            : (e.organizations as { orgname?: string } | undefined)?.orgname || "Unknown Org",
        date: e.date ? new Date(e.date).toLocaleDateString() : "-",
        location: e.location || "-",
        status: e.status || "-",
        onClickView: () => alert(`View ${e.title}`),
        onClickEdit: () => alert(`Edit ${e.title}`),
      };
    });

    return mapped;
  } catch (error) {
    console.error("Error fetching events by status:", JSON.stringify(error, null, 2));
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
      .select("eventid, title, orgid, date, location, status, organizations:orgid (orgname)")
      .eq("eventid", eventId)
      .single();

    if (error) {
      console.error("Error fetching event by ID:", JSON.stringify(error, null, 2));
      return null;
    }

    if (!data) {
      return null;
    }

    // Map event to tableData format
    const e = data as EventWithOrg;
    const mapped: EventData = {
      eventid: e.eventid || "",
      eventName: e.title || "Untitled Event",
      organization: e.orgid || "Unknown Org", // orgid for debugging
      orgname:
        Array.isArray(e.organizations)
          ? (e.organizations as { orgname?: string }[])[0]?.orgname || "Unknown Org"
          : (e.organizations as { orgname?: string } | undefined)?.orgname || "Unknown Org",
      date: e.date ? new Date(e.date).toLocaleDateString() : "-",
      location: e.location || "-",
      status: e.status || "-",
      onClickView: () => alert(`View ${e.title}`),
      onClickEdit: () => alert(`Edit ${e.title}`),
    };

    return mapped;
  } catch (error) {
    console.error("Error fetching event by ID:", JSON.stringify(error, null, 2));
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
      console.error("Error updating event status:", JSON.stringify(error, null, 2));
      throw error;
    }
  } catch (error) {
    console.error("Error updating event status:", JSON.stringify(error, null, 2));
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
      console.error("Error deleting event:", JSON.stringify(error, null, 2));
      throw error;
    }
  } catch (error) {
    console.error("Error deleting event:", JSON.stringify(error, null, 2));
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
      console.error("Error creating event:", JSON.stringify(error, null, 2));
      throw error;
    }
  } catch (error) {
    console.error("Error creating event:", JSON.stringify(error, null, 2));
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

export const fetchOrganizationOptions = async (): Promise<Option[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('organizations')
    .select('orgid, orgname');
  if (error || !data) return [];
  return data.map((org: { orgid: string; orgname: string }) => ({
    value: org.orgid,
    label: org.orgname || org.orgid,
  }));
}; 