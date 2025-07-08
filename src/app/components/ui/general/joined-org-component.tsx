// app/components/ui/general/joined-org-component.tsx
"use client";

import React, { useState, useMemo } from "react";
import ShowcaseCard, { ShowcaseCardProps } from "./showcase-card-component";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { removeMember } from "@/lib/actions/organization"; // <-- Import the correct server action

interface JoinedOrgComponentProps {
  initialOrgs: ShowcaseCardProps[];
}

const JoinedOrgComponent: React.FC<JoinedOrgComponentProps> = ({ initialOrgs }) => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState(initialOrgs);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return organizations;
    return organizations.filter(org =>
      org.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, organizations]);

  const handleLeaveClick = async (orgID: string, studentId: number) => {
    if (!confirm("Are you sure you want to leave this organization? If you are an officer, this may have consequences.")) {
      return;
    }
    
    setIsLoading(orgID);
    try {
      // Use the 'removeMember' server action for leaving
      const result = await removeMember(orgID, studentId);
      
      if (result.error) throw new Error(result.error);
      
      // On success, filter the organization out of the local state
      setOrganizations(currentOrgs =>
        currentOrgs.filter(org => org.orgID !== orgID)
      );

      console.log(`Successfully left organization ${orgID}`);
      // No need to refresh page, local state update is instant
    } catch (error) {
      console.error("Error leaving organization:", error);
      alert("Failed to leave organization. You may not have permission if you are the last officer.");
    } finally {
      setIsLoading(null);
    }
  };

  const handleButtonClick = async (buttonLabel: string, orgID: string) => {
    if (buttonLabel === "Leave") {
      // We need the student's ID to call the removeMember action
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: student } = await supabase.from('student').select('studentid').eq('user_id', user.id).single();
      if (student) {
        handleLeaveClick(orgID, student.studentid);
      }
    } else if (buttonLabel === "View") {
      router.push(`/organization/${orgID}/newsfeed`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-6xl mx-auto">
      <div className="mb-4">
        <span className="font-bold text-xl">Joined Organizations</span>
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

export default JoinedOrgComponent;