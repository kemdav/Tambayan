"use client";

import React, { useEffect, useState, useMemo } from "react";
import ShowcaseCard from "@/app/components/ui/general/showcase-card-component";
import { Input } from "@/app/components/ui/general/input/input";
import { SearchIcon } from "@/app/components/icons/SearchIcon";
import {
  fetchOrganizations,
  deleteOrganization,
} from "@/lib/actions/orgoversight";
import { getUniversityIdFromSession } from "@/lib/actions/orgoversight"; 

interface Org {
  orgid: string;
  orgname: string | null;
  category: string | null;
  picture?: string | null;
  cover_photo_path?: string | null;
}

export default function OrgOversightPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const universityId = await getUniversityIdFromSession();
        if (!universityId) {
          console.error("❌ No university ID found");
          return;
        }

        const data = await fetchOrganizations(universityId);
        if (data) {
          setOrgs(data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch organizations:", err);
      }
    }

    load();
  }, []);

  const handleRemove = async (orgID: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this organization?"
    );
    if (!confirmed) return;

    try {
      await deleteOrganization(orgID);
      setOrgs((prev) => prev.filter((org) => org.orgid !== orgID));
    } catch (err) {
      console.error("❌ Failed to delete organization:", err);
    }
  };

  const filteredOrgs = useMemo(() => {
    if (!search.trim()) return orgs;
    return orgs.filter(
      (org) =>
        (org.orgname || "").toLowerCase().includes(search.toLowerCase()) ||
        (org.category || "").toLowerCase().includes(search.toLowerCase())
    );
  }, [search, orgs]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl h-[90vh] bg-white border rounded-xl shadow-md p-6 overflow-y-auto">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold">School Organizations</h1>
          <Input
            placeholder="Search organizations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<SearchIcon width={20} height={20} />}
            className="max-w-sm"
          />
        </div>

        <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
          {filteredOrgs.length > 0 ? (
            filteredOrgs.map((org) => (
              <ShowcaseCard
                key={org.orgid}
                orgID={org.orgid}
                title={org.orgname || "Untitled Organization"} // Also add fallbacks here
                subtitle={org.category || "Uncategorized"}     // and here for better UI
                tagText={org.category || "Uncategorized"}
                memberCount={0}
                eventCount={0}
                avatarUrl={org.picture ?? undefined}
                coverPhotoUrl={org.cover_photo_path ?? undefined}
                buttons={[
                  {
                    label: "Remove",
                    bgColor: "bg-red-500",
                    textColor: "text-white",
                    onClick: () => handleRemove(org.orgid),
                  },
                ]}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 w-full pt-12">
              No organizations found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}