"use client";

import React, { useState, useMemo } from "react";
import ShowcaseCard from "./showcase-card-component";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { createClient } from "@/lib/supabase/client";
import { ShowcaseCardProps } from "./showcase-card-component";
import { useRouter } from "next/navigation";

interface SubscribedOrgComponentProps {
  // We change the prop name to be clearer
  initialOrgs: ShowcaseCardProps[];
}

const SubscribedOrgComponent: React.FC<SubscribedOrgComponentProps> = ({ initialOrgs }) => {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  // Use state to manage the list so we can remove items
  const [organizations, setOrganizations] = useState(initialOrgs);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter(org =>
      org.title.toLowerCase().includes(search.toLowerCase()) ||
      org.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, organizations]);

  const handleLeaveClick = async (orgID: string) => {
    if (!confirm("Are you sure you want to leave this organization?")) {
      return;
    }
    
    setIsLoading(orgID);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated.");

      const { data: studentProfile } = await supabase
        .from('student').select('studentid').eq('user_id', user.id).single();
      if (!studentProfile) throw new Error("Could not find student profile.");

      // Perform the DELETE operation on the orgmember table
      const { error } = await supabase
        .from('orgmember')
        .delete()
        .eq('orgid', orgID)
        .eq('studentid', studentProfile.studentid);
      
      if (error) throw error;
      
      // On success, filter the organization out of the local state
      setOrganizations(currentOrgs =>
        currentOrgs.filter(org => org.orgID !== orgID)
      );

      console.log(`Successfully left organization ${orgID}`);
    } catch (error) {
      console.error("Error leaving organization:", error);
    } finally {
      setIsLoading(null);
    }
  };

  const handleButtonClick = (buttonLabel: string, orgID: string) => {
    if (buttonLabel === "Leave") {
      handleLeaveClick(orgID);
    } else if (buttonLabel === "View") {
      router.push(`/organization/${orgID}/newsfeed`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-6xl mx-auto">
      <div className="mb-4">
        <span className="font-bold text-xl">Subscribed Organizations</span>
      </div>
      <div className="w-full">
        <Input
          leftIcon={<SearchIcon width={20} height={20} />}
          placeholder="Search Your Organizations.."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
        {filteredOrgs.map((orgProps) => (
          <div key={orgProps.orgID} className="flex-shrink-0">
            <ShowcaseCard
              {...orgProps}
              buttons={orgProps.buttons.map(btn => {
                const isLeaving = isLoading === orgProps.orgID && btn.label === "Leave";
                return {
                  ...btn,
                  label: isLeaving ? "Leaving..." : btn.label,
                  disabled: isLeaving,
                  onClick: () => handleButtonClick(btn.label, orgProps.orgID),
                };
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscribedOrgComponent;