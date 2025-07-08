"use server";

import { createClient } from "@/lib/supabase/server";

export async function getTotalEvents(universityId: string): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("school", universityId);

  if (error) {
    console.error("❌ Failed to fetch events count:", error);
    return 0;
  }

  console.log(`✅ Total events for ${universityId}:`, count);
  return count ?? 0;
}

export async function getOrgStatsByUniversity(
  universityId: string
): Promise<{
  total: number;
  active: number;
}> {
  const supabase = await createClient();

  const { data: allOrgs, error } = await supabase
    .from("organizations")
    .select("orgid, universityid, status");

  if (error) {
    console.error("❌ Failed to fetch orgs:", error);
    return { total: 0, active: 0 };
  }

  const filtered = allOrgs?.filter(
    (org) => org.universityid?.trim().toLowerCase() === universityId
  );

  const total = filtered?.length ?? 0;
  const inactive =
    filtered?.filter((org) => org.status === "inactive").length ?? 0;
  const active = total - inactive;

  console.log(`✅ Org stats for ${universityId}:`, { total, active });

  return { total, active };
}

export async function getStudentEngagement(
  universityId: string
): Promise<number> {
  const supabase = await createClient();

  // Get all orgs in university
  const { data: orgs, error: orgError } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", universityId);

  if (orgError || !orgs) {
    console.error("❌ Error fetching orgs:", orgError);
    return 0;
  }

  let totalEngagementSum = 0;
  let orgWithEventsCount = 0;

  for (const org of orgs) {
    const orgId = org.orgid;

    // Get total members in org
    const { count: memberCount, error: memberError } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", orgId);

    if (memberError || !memberCount || memberCount === 0) continue;

    // Get all events for org
    const { data: events, error: eventsError } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", orgId);

    if (eventsError || !events || events.length === 0) continue;

    let orgEventEngagementSum = 0;

    for (const event of events) {
      const { data: attendees, error: attendanceError } = await supabase
        .from("eventattendance")
        .select("studentid")
        .eq("eventid", event.eventid);

      if (attendanceError || !attendees) continue;

      const uniqueAttendees = new Set(attendees.map((a) => a.studentid));
      const eventEngagement = uniqueAttendees.size / memberCount;

      orgEventEngagementSum += eventEngagement;
    }

    const avgOrgEngagement = orgEventEngagementSum / events.length;
    totalEngagementSum += avgOrgEngagement;
    orgWithEventsCount++;
  }

  // Final result: average across all orgs
  const finalEngagement =
    orgWithEventsCount > 0 ? (totalEngagementSum / orgWithEventsCount) * 100 : 0;

  return Math.round(finalEngagement);
}


function getBucketLabel(date: Date, timePeriod: string): string {
  const month = date.toLocaleString("en-US", { month: "short" });

  switch (timePeriod) {
    case "this_week":
      return `${month} ${date.getDate().toString().padStart(2, "0")}`;
    case "this_month":
    case "last_month":
      const weekNum = Math.ceil(date.getDate() / 7);
      return `Week ${weekNum}`;
    case "last_6_months":
    case "last_year":
      return month; // Just return the month (e.g., "Jan")
    default:
      return `${month} ${date.getDate()}`;
  }
}

export async function getOrgActivityForUniversity(
  universityId: string,
  timePeriod: string = "this_week"
) {
  const supabase = await createClient();

  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1); // include today

  const start = new Date(end);

  // Adjust start date based on selected timePeriod
  switch (timePeriod) {
    case "this_week":
      start.setDate(end.getDate() - 7);
      break;
    case "this_month":
      start.setMonth(end.getMonth());
      start.setDate(1);
      break;
    case "last_month":
      start.setMonth(end.getMonth() - 1);
      start.setDate(1);
      end.setMonth(end.getMonth() - 1);
      end.setDate(new Date(end.getFullYear(), end.getMonth() + 1, 0).getDate() + 1);
      break;
    case "last_6_months":
      start.setMonth(end.getMonth() - 6);
      break;
    case "last_year":
      start.setFullYear(end.getFullYear() - 1);
      start.setMonth(0); // Jan
      start.setDate(1);
      end.setFullYear(start.getFullYear() + 1);
      end.setMonth(0); // Reset to Jan next year
      end.setDate(1);
      break;
    default:
      start.setDate(end.getDate() - 7);
      break;
  }

  const { data: orgs, error: orgsError } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", universityId);

  if (orgsError || !orgs) {
    console.error("❌ Error fetching organizations:", orgsError);
    return [];
  }

  const orgIds = orgs.map((org) => org.orgid);

  const { data: events } = await supabase
    .from("events")
    .select("date")
    .in("orgid", orgIds)
    .gte("date", start.toISOString())
    .lt("date", end.toISOString());

  const { data: posts } = await supabase
    .from("post")
    .select("posted")
    .in("orgid", orgIds)
    .gte("posted", start.toISOString())
    .lt("posted", end.toISOString());

  const result: Record<string, { date: string; events: number; posts: number }> = {};

  const cursor = new Date(start);
  const step = timePeriod === "last_6_months" || timePeriod === "last_year" ? 30 : 1;

  while (cursor < end) {
    const label = getBucketLabel(new Date(cursor), timePeriod);
    if (!result[label]) {
      result[label] = { date: label, events: 0, posts: 0 };
    }
    cursor.setDate(cursor.getDate() + step);
  }

  for (const event of events ?? []) {
    if (!event.date) continue;
    const label = getBucketLabel(new Date(event.date), timePeriod);
    if (!result[label]) result[label] = { date: label, events: 0, posts: 0 };
    result[label].events++;
  }

  for (const post of posts ?? []) {
    if (!post.posted) continue;
    const label = getBucketLabel(new Date(post.posted), timePeriod);
    if (!result[label]) result[label] = { date: label, events: 0, posts: 0 };
    result[label].posts++;
  }

  return Object.values(result);
}



export interface Organization {
  name: string;
  engagement: number;
  events: number;
}

export async function getTopPerformingOrgs(universityId: string): Promise<Organization[]> {
  const supabase = await createClient();

  const { data: orgs, error: orgError } = await supabase
    .from("organizations")
    .select("orgid, orgname")
    .eq("universityid", universityId);

  if (orgError || !orgs) {
    console.error("❌ Failed to fetch organizations:", orgError);
    return [];
  }

  const results: Organization[] = [];

  for (const org of orgs) {
    const orgId = org.orgid;

    const { count: memberCount, error: memberError } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", orgId);

    if (memberError || !memberCount || memberCount === 0) continue;

    const { data: events, error: eventError } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", orgId);

    if (eventError || !events || events.length === 0) continue;

    let engagementSum = 0;

    for (const event of events) {
      const { data: attendees, error: attendError } = await supabase
        .from("eventattendance")
        .select("studentid")
        .eq("eventid", event.eventid);

      if (attendError || !attendees) continue;

      const uniqueAttendees = new Set(attendees.map((a) => a.studentid));
      engagementSum += uniqueAttendees.size / memberCount;
    }

    const averageEngagement = (engagementSum / events.length) * 100;

    results.push({
      name: org.orgname ?? "Unnamed Org",
      engagement: Math.round(averageEngagement),
      events: events.length,
    });
  }

  return results.sort((a, b) => b.engagement - a.engagement).slice(0, 4);
}

export async function getEventEngagementMetrics(universityId: string): Promise<{
  mostAttendedEvent: string;
  highestEngagementOrg: string;
  averageFeedbackScore: string;
}> {
  const supabase = await createClient();

  // 🟢 1. Most Attended Event
  const { data: attendanceCounts, error: attendanceErr } = await supabase
    .from("eventattendance")
    .select("eventid, studentid");

  const { data: events, error: eventErr } = await supabase
    .from("events")
    .select("eventid, title")
    .eq("school", universityId);

  if (attendanceErr || eventErr || !attendanceCounts || !events) {
    console.error("❌ Error fetching data for most attended event:", {
      attendanceErr,
      eventErr,
    });
    return {
      mostAttendedEvent: "N/A",
      highestEngagementOrg: "N/A",
      averageFeedbackScore: "0",
    };
  }

  const attendanceMap: Record<number, number> = {};

  for (const { eventid } of attendanceCounts) {
    if (!attendanceMap[eventid]) attendanceMap[eventid] = 0;
    attendanceMap[eventid]++;
  }

  let topEvent = { title: "N/A", count: -1 };

  for (const event of events) {
    const count = attendanceMap[event.eventid] || 0;
    if (count > topEvent.count) {
      topEvent = { title: event.title ?? "Untitled", count };
    }
  }

  // 🟡 2. Highest Engagement Org
  const topOrgs = await getTopPerformingOrgs(universityId);
  const highestEngagementOrg = topOrgs[0]?.name ?? "N/A";

  // 🔵 3. Average Feedback Score (treat nulls as 0 using ??)
  const { data: feedback, error: feedbackErr } = await supabase
    .from("eventattendance")
    .select("rating, eventid");

  if (feedbackErr || !feedback) {
    console.error("❌ Error fetching feedback ratings:", feedbackErr);
  }

  const uniEventIds = new Set(events.map((e) => e.eventid));

  const ratings = (feedback ?? [])
    .filter((r) => uniEventIds.has(r.eventid))
    .map((r) => r.rating ?? 0); // null => 0

  const avg =
    ratings.length > 0
      ? Math.round((ratings.reduce((a, b) => a + b, 0) / ratings.length) * 10) / 10
      : 0;

  return {
    mostAttendedEvent: topEvent.title,
    highestEngagementOrg,
    averageFeedbackScore: avg.toString(),
  };
}
