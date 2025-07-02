"use client";

import React, { useState, useMemo } from "react";
import OrgRecruitCard from "./org-recruit-card";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";

import type { ComponentProps } from "react";

export const JOIN_ORG_CARD_BG = "#f8f5ef";

interface JoinOrgCardProps {
  orgs: Array<ComponentProps<typeof OrgRecruitCard>>;
  onViewClick?: (orgID: string) => void;
  onJoinClick?: (orgID: string) => void;
}

const JoinOrgCard: React.FC<JoinOrgCardProps> = ({ orgs, onViewClick, onJoinClick }) => {
  const [search, setSearch] = useState("");

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return orgs;
    return orgs.filter(org =>
      org.title.toLowerCase().includes(search.toLowerCase()) ||
      org.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, orgs]);

  // Default click handlers
  const handleViewClick = (orgID: string) => {
    if (onViewClick) {
      onViewClick(orgID);
    } else {
      console.log("View clicked", orgID);
    }
  };

  const handleJoinClick = (orgID: string) => {
    if (onJoinClick) {
      onJoinClick(orgID);
    } else {
      console.log("Join clicked", orgID);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-7xl h-full min-h-screen">
      <div className="mb-4">
        <span className="font-bold text-xl">Organization Oversight</span>
      </div>
      <div className="w-full">
        <Input
          leftIcon={<SearchIcon width={20} height={20} />}
          placeholder="Search Organizations.."
          aria-label="Search organizations"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6 max-h-[45rem] overflow-y-auto">
        {filteredOrgs.length === 0 ? (
          <div className="text-gray-500 text-center w-full">No organizations found.</div>
        ) : (
          filteredOrgs.map((orgProps) => (
            <div key={orgProps.orgID} className="flex-shrink-0">
              <OrgRecruitCard
                {...orgProps}
                onView={() => handleViewClick(orgProps.orgID)}
                onJoin={() => handleJoinClick(orgProps.orgID)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JoinOrgCard; 