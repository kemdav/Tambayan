"use server";

import { createClient } from "@/lib/supabase/server";

async function getUniversityIdFromSession(): Promise<string | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user || !user.email) {
    console.log("❌ Auth error or no user:", userError);
    return null;
  }

  console.log("👤 Logged-in university email:", user.email);

  const { data: university, error: universityError } = await supabase
    .from("university")
    .select("universityid")
    .eq("universityemail", user.email)
    .maybeSingle();

  if (universityError) {
    console.log("❌ Supabase error while fetching university:", universityError);
    return null;
  }

  if (!university) {
    console.log("⚠️ No matching university found for email:", user.email);
    return null;
  }

  console.log("✅ Fetched university ID:", university.universityid);
  return university.universityid;
}

export async function getTotalEvents(): Promise<number> {
  const supabase = await createClient();
  const universityId = await getUniversityIdFromSession(); // gets from session

  if (!universityId) return 0;

  const { count, error } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("universityid", universityId); // ✅ This must match your DB column

  if (error) {
    console.error("❌ Failed to fetch events count:", error);
    return 0;
  }

  return count ?? 0;
}




export async function getOrgStats(): Promise<{ total: number; active: number }> {
  const supabase = await createClient();
  const universityId = await getUniversityIdFromSession();
  if (!universityId) return { total: 0, active: 0 };

  const { data: orgs, error } = await supabase
    .from("organizations")
    .select("status")
    .eq("universityid", universityId);

  if (error || !orgs) return { total: 0, active: 0 };

  const total = orgs.length;
  const inactive = orgs.filter((org) => org.status === "inactive").length;
  const active = total - inactive;

  return { total, active };
}


export async function getStudentEngagement(timePeriod: string = "this_week"): Promise<number> {
  const supabase = await createClient();
  const universityId = await getUniversityIdFromSession();
  if (!universityId) return 0;

  // Determine time range
  const end = new Date();
  end.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() + 1);

  const start = new Date(end);
  switch (timePeriod) {
    case "this_week":
      start.setDate(end.getDate() - 7);
      break;
    case "this_month":
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
      break;
    default:
      start.setDate(end.getDate() - 7);
  }

  // Get all students
  const { data: students } = await supabase
    .from("student")
    .select("studentid")
    .eq("universityid", universityId);
  const studentIds = students?.map((s) => s.studentid) ?? [];
  const totalStudents = studentIds.length;

  // Get all posts
  const { count: totalPosts } = await supabase
    .from("post")
    .select("*", { count: "exact", head: true })
    .in("orgid", (
      await supabase
        .from("organizations")
        .select("orgid")
        .eq("universityid", universityId)
    ).data?.map((o) => o.orgid) ?? []);

  // Count of comments by university students in selected time frame
  const { count: commentCount } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .in("studentid", studentIds)
    .gte("posted", start.toISOString())
    .lt("posted", end.toISOString());

  const denominator = totalStudents + (totalPosts ?? 0);
  if (!commentCount || denominator === 0) return 0;

  const engagement = commentCount / denominator;
  return Math.round(engagement * 100);
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
  const universityId = await getUniversityIdFromSession();
  if (!universityId) return [];

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
    .eq("universityid", universityId);

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
    if (!e.date) continue;
    const label = getBucketLabel(new Date(e.date), timePeriod);
    result[label].events++;
  }

  for (const p of posts ?? []) {
    if (!p.posted) continue;
    const label = getBucketLabel(new Date(p.posted), timePeriod);
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
  const universityId = await getUniversityIdFromSession();
  if (!universityId) {
    console.log("❌ No university ID found.");
    return [];
  }

  const { data: orgs, error: orgsError } = await supabase
    .from("organizations")
    .select("orgid, orgname")
    .eq("universityid", universityId);

  if (orgsError || !orgs) {
    console.error("❌ Failed to fetch organizations:", orgsError);
    return [];
  }

  const results: Organization[] = [];

  for (const org of orgs) {
    console.log(`📦 Checking org: ${org.orgname} (${org.orgid})`);

    const { count: memberCount } = await supabase
      .from("orgmember")
      .select("*", { count: "exact", head: true })
      .eq("orgid", org.orgid);

    if (!memberCount || memberCount === 0) {
      console.log(`⛔ Skipping ${org.orgname} — No members`);
      continue;
    }

    const { data: events } = await supabase
      .from("events")
      .select("eventid")
      .eq("orgid", org.orgid);

    if (!events || events.length === 0) {
      console.log(`⛔ Skipping ${org.orgname} — No events`);
      continue;
    }

    let sum = 0;
    for (const e of events) {
      const { data: attendees } = await supabase
        .from("eventattendance")
        .select("studentid")
        .eq("eventid", e.eventid);

      const unique = new Set(attendees?.map((a) => a.studentid));
      sum += unique.size / memberCount;
    }

    const engagement = Math.round((sum / events.length) * 100);
    console.log(`✅ ${org.orgname} | Events: ${events.length} | Engagement: ${engagement}%`);

    results.push({
      name: org.orgname ?? "Unnamed Org",
      engagement,
      events: events.length,
    });
  }

  const sorted = results.sort((a, b) => b.engagement - a.engagement).slice(0, 4);
  console.log("🏆 Top Orgs:", sorted);

  return sorted;
}

export async function getEventEngagementMetrics() {
  const supabase = await createClient();
  const universityId = await getUniversityIdFromSession();
  if (!universityId) return { avgComments: "0", avgLikes: "0", avgRegistrations: "0" };

  const { data: orgs } = await supabase
    .from("organizations")
    .select("orgid")
    .eq("universityid", universityId);
  const orgIds = orgs?.map((o) => o.orgid) ?? [];

  const { data: posts } = await supabase
    .from("post")
    .select("postid")
    .in("orgid", orgIds);
  const postIds = posts?.map((p) => p.postid) ?? [];

  const { count: commentCount } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .in("postid", postIds);

  const { count: likeCount } = await supabase
    .from("likedby")
    .select("*", { count: "exact", head: true })
    .in("postid", postIds);

  const { data: events } = await supabase
    .from("events")
    .select("eventid")
    .eq("universityid", universityId);
  const eventIds = events?.map((e) => e.eventid) ?? [];

  const { count: registrationCount } = await supabase
    .from("eventregistrations")
    .select("*", { count: "exact", head: true })
    .in("eventid", eventIds);

  const avgComments = postIds.length ? (commentCount ?? 0) / postIds.length : 0;
  const avgLikes = postIds.length ? (likeCount ?? 0) / postIds.length : 0;
  const avgRegistrations = eventIds.length ? (registrationCount ?? 0) / eventIds.length : 0;

  return {
    avgComments: avgComments.toFixed(1),
    avgLikes: avgLikes.toFixed(1),
    avgRegistrations: avgRegistrations.toFixed(1),
  };
}
