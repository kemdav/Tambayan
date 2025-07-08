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

  const { data: orgs, error: orgError } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", universityId);

  if (orgError || !orgs) {
    console.error("❌ Error fetching orgs:", orgError);
    return 0;
  }

  let totalPercentage = 0;
  let orgCount = 0;

  for (const org of orgs) {
    const orgId = org.orgid;

    const { data: orgEvents, error: eventsError } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", orgId);

    if (eventsError || !orgEvents) {
      console.error(`❌ Error fetching events for ${orgId}:`, eventsError);
      continue;
    }

    const eventIds = orgEvents.map((e) => e.eventid);
    if (eventIds.length === 0) continue;

    const { data: attendanceData, error: attendanceError } = await supabase
      .from("eventattendance")
      .select("studentid")
      .in("eventid", eventIds);

    if (attendanceError || !attendanceData) {
      console.error(`❌ Error fetching attendance for ${orgId}:`, attendanceError);
      continue;
    }

    const uniqueAttendees = new Set(attendanceData.map((a) => a.studentid));

    const { count: totalMembers, error: memberError } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", orgId);

    if (memberError || !totalMembers || totalMembers === 0) {
      console.warn(`⚠️ Skipping org ${orgId} due to missing members`);
      continue;
    }

    const ratio = uniqueAttendees.size / totalMembers;
    totalPercentage += ratio;
    orgCount++;
  }

  const engagement = orgCount > 0 ? (totalPercentage / orgCount) * 100 : 0;
  return Math.round(engagement);
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
}

export async function getOrgActivityForUniversity(universityId: string) {
  const supabase = await createClient();

  // Set date range: July 1 to July 7 (inclusive)
  const start = new Date("2024-07-01");
  const end = new Date("2024-07-08"); // use July 8 for `.lt()` to include July 7

  // Fetch organizations for university
  const { data: orgs, error: orgsError } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", universityId);

  if (orgsError || !orgs) {
    console.error("❌ Error fetching organizations:", orgsError);
    return [];
  }

  const orgIds = orgs.map((org) => org.orgid);

  // Fetch events within date range for those orgs
  const { data: events } = await supabase
    .from("events")
    .select("date")
    .in("orgid", orgIds)
    .gte("date", start.toISOString())
    .lt("date", end.toISOString());

  // Fetch posts within date range for those orgs
  const { data: posts } = await supabase
    .from("post")
    .select("posted")
    .in("orgid", orgIds)
    .gte("posted", start.toISOString())
    .lt("posted", end.toISOString());

  console.log("📅 Raw event dates:", events);
  console.log("📝 Raw post dates:", posts);

  // Initialize result for July 1 to July 7
  const result: Record<string, { date: string; events: number; posts: number }> = {};

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const label = formatDate(d);
    result[label] = { date: label, events: 0, posts: 0 };
  }

  // Count events per day
  for (const event of events ?? []) {
    if (!event.date) continue;
    const label = formatDate(new Date(event.date));
    if (result[label]) result[label].events++;
  }

  // Count posts per day
  for (const post of posts ?? []) {
    if (!post.posted) continue;
    const label = formatDate(new Date(post.posted));
    if (result[label]) result[label].posts++;
  }

  return Object.values(result);
}