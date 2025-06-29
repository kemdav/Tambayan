"use client";

import React, { useState, useMemo } from "react";
import ShowcaseCard from "./showcase-card-component";
import { Input } from "./input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";

import type { ComponentProps } from "react";

// Export the card background color for use in the page
export const SUBSCRIBED_ORG_CARD_BG = "#f8f5ef";

interface SubscribedOrgComponentProps {
  orgs: Array<ComponentProps<typeof ShowcaseCard>>;
  onButtonClick?: (orgID: string) => void;
}

const SubscribedOrgComponent: React.FC<SubscribedOrgComponentProps> = ({ orgs, onButtonClick }) => {
  const [search, setSearch] = useState("");

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return orgs;
    return orgs.filter(org =>
      org.title.toLowerCase().includes(search.toLowerCase()) ||
      org.subtitle.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, orgs]);

  // Default click handler
  const handleButtonClick = (orgID: string) => {
    if (onButtonClick) {
      onButtonClick(orgID);
    } else {
      console.log("clicked", orgID);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-6xl mx-auto">
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
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-6">
        {filteredOrgs.length === 0 ? (
          <div className="text-gray-500 text-center w-full">No organizations found.</div>
        ) : (
          filteredOrgs.map((orgProps) => (
            <div key={orgProps.orgID} className="flex-shrink-0">
              <ShowcaseCard
                {...orgProps}
                buttons={orgProps.buttons.map(btn => ({
                  ...btn,
                  onClick: () => handleButtonClick(orgProps.orgID)
                }))}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubscribedOrgComponent; 