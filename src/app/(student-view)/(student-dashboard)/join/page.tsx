// app/(student-dashboard)/join/page.tsx

import { createClient } from '@/lib/supabase/server';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import JoinOrgCard from "@/app/components/ui/general/join-org-card";
import { OrgRecruitCardProps } from "@/app/components/ui/general/org-recruit-card";

// Interface for the base organization data
interface Organization {
  orgid: string;
  orgname: string;
  status: string;
  picture: string | null;
  cover_photo_path: string | null;
}

// CORRECTED INTERFACES to match the real data shape from the clean count syntax
interface MemberCountData {
  orgid: string;
  orgmember: { count: number }[]; // The property is named after the table
}
interface EventCountData {
  orgid: string;
  events: { count: number }[]; // The property is named after the table
}

export default async function JoinOrganizationPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }


  const { data: studentProfile, error: profileError } = await supabase
    .from("student")
    .select("studentid, universityid")
    .eq("user_id", user.id)
    .single();

  if (profileError || !studentProfile) {
    console.error("Student Profile Error:", profileError);
    return <div>Error: Student profile not found.</div>;
  }
  
  const { data: orgIdObjects, error: orgIdError } = await supabase.from('organizations').select('orgid').eq('universityid', studentProfile.universityid);
  if (orgIdError) {
      console.error("Org ID Fetch Error:", orgIdError);
      return <div>Error fetching organization data.</div>;
  }
  const orgIds = orgIdObjects.map(o => o.orgid);

  // Parallel Data Fetching for Performance
  const [orgsResult, memberCountsResult, eventCountsResult, joinedOrgsResult] = await Promise.all([
    // 1. Get base organizations
    supabase
      .from("organizations")
      .select("orgid, orgname, status, picture, cover_photo_path")
      .in("orgid", orgIds),
    
    // 2. Get all member counts using the clean syntax
    supabase
      .from("organizations")
      .select("orgid, orgmember(count)") // CORRECTED SYNTAX
      .in('orgid', orgIds),

    // 3. Get all event counts using the clean syntax
    supabase
      .from("organizations")
      .select("orgid, events(count)") // CORRECTED SYNTAX
      .in('orgid', orgIds),

    // 4. Get orgs the student has joined
    supabase
      .from("orgmember")
      .select("orgid")
      .eq("studentid", studentProfile.studentid),
  ]);

  const { data: orgsData, error: orgsError } = orgsResult;
  const { data: memberCountsData, error: memberCountsError } = memberCountsResult;
  const { data: eventCountsData, error: eventCountsError } = eventCountsResult;
  const { data: joinedOrgsData, error: joinedOrgsError } = joinedOrgsResult;
  
  if (orgsError || memberCountsError || eventCountsError || joinedOrgsError) {
    console.error("Data Fetching Errors:", { orgsError, memberCountsError, eventCountsError, joinedOrgsError });
    return <div>Error fetching organization data.</div>;
  }

  // --- Join the data together in JavaScript ---

  // CORRECTED LOGIC: Access the count via the table name property.
  const memberCountsMap = new Map(memberCountsData.map((item: MemberCountData) => [item.orgid, item.orgmember[0]?.count ?? 0]));
  const eventCountsMap = new Map(eventCountsData.map((item: EventCountData) => [item.orgid, item.events[0]?.count ?? 0]));
  const joinedOrgIds = new Set(joinedOrgsData.map((m: { orgid: string }) => m.orgid));

  // Transform the data, looking up counts from the Maps
  const transformedOrgs: OrgRecruitCardProps[] = orgsData.map((org: Organization) => {
    const hasJoined = joinedOrgIds.has(org.orgid);

    return {
      orgID: org.orgid,
      title: org.orgname,
      subtitle: "University Organization",
      memberCount: memberCountsMap.get(org.orgid) || 0,
      eventCount: eventCountsMap.get(org.orgid) || 0,
      avatarUrl: org.picture ? supabase.storage.from("organization-assets").getPublicUrl(org.picture).data.publicUrl : undefined,
      coverPhotoUrl: org.cover_photo_path ? supabase.storage.from("organization-assets").getPublicUrl(org.cover_photo_path).data.publicUrl : undefined,
      tagText: org.status === 'active' ? 'Active' : 'Inactive',
      tagBgColor: org.status === 'active' ? 'bg-green-100' : 'bg-red-100',
      tagTextColor: org.status === 'active' ? 'text-green-800' : 'text-red-800',
      joinLabel: hasJoined ? "Joined" : "Join",
      joinDisabled: hasJoined,
    };
  });

  return (
    <div className="container mx-auto py-8">
      <JoinOrgCard initialOrgs={transformedOrgs} />
    </div>
  );
}