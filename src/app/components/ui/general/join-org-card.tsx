"use client";

import React, { useState, useMemo } from "react";
import OrgRecruitCard from "./org-recruit-card";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { createClient } from "@/lib/supabase/client";
import type { OrgRecruitCardProps } from "./org-recruit-card";

// 1. SIMPLIFY PROPS: The component only needs the initial data.
interface JoinOrgCardProps {
  initialOrgs: OrgRecruitCardProps[];
}

const JoinOrgCard: React.FC<JoinOrgCardProps> = ({ initialOrgs }) => {
  // 2. STATE MANAGEMENT: Set up state based on the initial prop. This is our single source of truth.
  const [organizations, setOrganizations] = useState(initialOrgs);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const supabase = useMemo(() => createClient(), []);

  // 3. FIX THE FILTERING LOGIC: This now depends on the `organizations` state.
  //    When `setOrganizations` is called, this will re-run with the new data.
  const filteredOrgs = useMemo(() => {
    if (!search.trim()) {
      return organizations; // Use the state variable
    }
    return organizations.filter(
      (
        org // Use the state variable
      ) =>
        org.title.toLowerCase().includes(search.toLowerCase()) ||
        org.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, organizations]); // Dependency array is now correct

  // 4. THE ACTION HANDLER: This logic was already correct.
  const handleSubscribeClick = async (orgID: string) => {
    setIsLoading(orgID);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        throw new Error("User not authenticated");
      }

      const { data: studentProfile, error: profileError } = await supabase
        .from("student")
        .select("studentid")
        .eq("user_id", user.id)
        .single();
      if (profileError || !studentProfile)
        throw new Error("Could not find student profile.");

      const { error: insertError } = await supabase
        .from("subscribedorg")
        .insert({ orgid: orgID, studentid: studentProfile.studentid });
      if (insertError) throw insertError;

      // This correctly updates the state, which will now trigger a re-render
      setOrganizations((currentOrgs) =>
        currentOrgs.map((org) =>
          org.orgID === orgID
            ? { ...org, joinLabel: "Subscribed", joinDisabled: true }
            : org
        )
      );
      console.log(`Successfully subscribed to organization ${orgID}`);
    } catch (error) {
      console.error("Error subscribing organization:", error);
    } finally {
      setIsLoading(null);
    }
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
        {/* This now maps over the correctly filtered list */}
        {filteredOrgs.map((orgProps) => (
          <div key={orgProps.orgID} className="flex-shrink-0">
            <OrgRecruitCard
              {...orgProps}
              onView={() => console.log("View clicked", orgProps.orgID)}
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
