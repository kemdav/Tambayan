// in /app/components/ui/general/join-org-card.tsx

"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // <-- STEP 1: Import the router
import OrgRecruitCard from "./org-recruit-card";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { createClient } from "@/lib/supabase/client";
import type { OrgRecruitCardProps } from "./org-recruit-card";

interface JoinOrgCardProps {
  initialOrgs: OrgRecruitCardProps[];
}

const JoinOrgCard: React.FC<JoinOrgCardProps> = ({ initialOrgs }) => {
  const router = useRouter(); // <-- STEP 2: Initialize the router
  const [organizations, setOrganizations] = useState(initialOrgs);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const supabase = useMemo(() => createClient(), []);

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter(
      (org) =>
        org.title.toLowerCase().includes(search.toLowerCase()) ||
        org.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, organizations]);

  const handleSubscribeClick = async (orgID: string) => {
    setIsLoading(orgID);
    try {
      // ... your existing subscribe logic ...
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { data: studentProfile } = await supabase
        .from("student")
        .select("studentid")
        .eq("user_id", user.id)
        .single();
      if (!studentProfile) throw new Error("Could not find student profile.");

      const { error } = await supabase
        .from("subscribedorg")
        .insert({ orgid: orgID, studentid: studentProfile.studentid });
      if (error) throw error;

      setOrganizations((currentOrgs) =>
        currentOrgs.map((org) =>
          org.orgID === orgID
            ? { ...org, joinLabel: "Subscribed", joinDisabled: true }
            : org
        )
      );
    } catch (error) {
      console.error("Error subscribing organization:", error);
    } finally {
      setIsLoading(null);
    }
  };

  // --- STEP 3: Create the navigation handler ---
  const handleViewClick = (orgID: string) => {
    // This will redirect the user to the organization's newsfeed page
    router.push(`/organization/${orgID}/newsfeed`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-7xl h-full min-h-screen">
      <div className="mb-4">
        <span className="font-bold text-xl">Join an Organization</span>
      </div>
      <div className="w-full">
        <Input
          leftIcon={<SearchIcon width={20} height={20} />}
          placeholder="Search Organizations.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
        {filteredOrgs.map((orgProps) => (
          <div key={orgProps.orgID} className="flex-shrink-0">
            <OrgRecruitCard
              {...orgProps}
              // --- STEP 4: Pass the correct handlers ---
              onView={() => handleViewClick(orgProps.orgID)}
              onJoin={() => handleSubscribeClick(orgProps.orgID)}
              joinDisabled={
                orgProps.joinDisabled || isLoading === orgProps.orgID
              }
              joinLabel={
                isLoading === orgProps.orgID
                  ? "Subscribing..."
                  : orgProps.joinLabel
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinOrgCard;
