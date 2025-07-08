"use server";

import { createClient } from "@/lib/supabase/server";

const UNIVERSITY_ID = "hardcoded-univ-id"; // 🔁 Replace this with your actual university ID

export async function getTotalEvents(): Promise<number> {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("school", UNIVERSITY_ID);

  if (error) {
    console.error("❌ Failed to fetch events count:", error);
    return 0;
  }

  return count ?? 0;
}

export async function getOrgStats(): Promise<{ total: number; active: number }> {
  const supabase = await createClient();

  const { data: allOrgs, error } = await supabase
    .from("organizations")
    .select("orgid, universityid, status");

  if (error) {
    console.error("❌ Failed to fetch orgs:", error);
    return { total: 0, active: 0 };
  }

  const filtered = allOrgs?.filter(
    (org) => org.universityid?.trim().toLowerCase() === UNIVERSITY_ID
  );

  const total = filtered?.length ?? 0;
  const inactive =
    filtered?.filter((org) => org.status === "inactive").length ?? 0;
  const active = total - inactive;

  return { total, active };
}

export async function getStudentEngagement(): Promise<number> {
  const supabase = await createClient();

  const { data: orgs } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", UNIVERSITY_ID);

  if (!orgs) return 0;

  let totalEngagementSum = 0;
  let orgWithEventsCount = 0;

  for (const org of orgs) {
    const { count: memberCount } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", org.orgid);

    if (!memberCount || memberCount === 0) continue;

    const { data: events } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", org.orgid);

    if (!events || events.length === 0) continue;

    let orgEventEngagementSum = 0;

    for (const event of events) {
      const { data: attendees } = await supabase
        .from("eventattendance")
        .select("studentid")
        .eq("eventid", event.eventid);

      const uniqueAttendees = new Set(attendees?.map((a) => a.studentid));
      const engagement = uniqueAttendees.size / memberCount;

      orgEventEngagementSum += engagement;
    }

    totalEngagementSum += orgEventEngagementSum / events.length;
    orgWithEventsCount++;
  }

  return orgWithEventsCount > 0
    ? Math.round((totalEngagementSum / orgWithEventsCount) * 100)
    : 0;
}

function getBucketLabel(date: Date, timePeriod: string): string {
  const month = date.toLocaleString("en-US", { month: "short" });

  switch (timePeriod) {
    case "this_week":
      return `${month} ${date.getDate().toString().padStart(2, "0")}`;
    case "this_month":
    case "last_month":
      return `Week ${Math.ceil(date.getDate() / 7)}`;
    case "last_6_months":
    case "last_year":
      return month;
    default:
      return `${month} ${date.getDate()}`;
  }
}

export async function getOrgActivity(timePeriod: string = "this_week") {
  const supabase = await createClient();

  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);

  const start = new Date(end);
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
      start.setMonth(0);
      start.setDate(1);
      end.setFullYear(start.getFullYear() + 1);
      end.setMonth(0);
      end.setDate(1);
      break;
    default:
      start.setDate(end.getDate() - 7);
  }

  const { data: orgs } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", UNIVERSITY_ID);

  const orgIds = orgs?.map((o) => o.orgid) ?? [];

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
  while (cursor < end) {
    const label = getBucketLabel(cursor, timePeriod);
    result[label] = { date: label, events: 0, posts: 0 };
    cursor.setDate(cursor.getDate() + 1);
  }

  for (const e of events ?? []) {
    if (!e.date) continue; // ✅ Fix: guard against null
    const label = getBucketLabel(new Date(e.date), timePeriod);
    if (!result[label]) result[label] = { date: label, events: 0, posts: 0 };
    result[label].events++;
  }

  for (const p of posts ?? []) {
    if (!p.posted) continue; // ✅ Fix: guard against null
    const label = getBucketLabel(new Date(p.posted), timePeriod);
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

export async function getTopOrgs(): Promise<Organization[]> {
  const supabase = await createClient();

  const { data: orgs } = await supabase
    .from("organizations")
    .select("orgid, orgname")
    .eq("universityid", UNIVERSITY_ID);

  const results: Organization[] = [];

  for (const org of orgs ?? []) {
    const { count: memberCount } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", org.orgid);

    if (!memberCount || memberCount === 0) continue;

    const { data: events } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", org.orgid);

    if (!events || events.length === 0) continue;

    let sum = 0;
    for (const e of events) {
      const { data: attendees } = await supabase
        .from("eventattendance")
        .select("studentid")
        .eq("eventid", e.eventid);

      const unique = new Set(attendees?.map((a) => a.studentid));
      sum += unique.size / memberCount;
    }

    results.push({
      name: org.orgname ?? "Unnamed Org",
      engagement: Math.round((sum / events.length) * 100),
      events: events.length,
    });
  }

  return results.sort((a, b) => b.engagement - a.engagement).slice(0, 4);
}
