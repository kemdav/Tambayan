"use client";

import { AvatarIcon } from "../avatar-icon-component";

interface Organization {
  name: string;
  engagement: number;
  events: number;
}

interface Props {
  organizations: Organization[];
}

export default function TopPerformingOrganizations({ organizations }: Props) {
  const topFour = [...organizations]
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 4);

  return (
    <div className="border rounded-lg p-4 w-full max-w-full shadow-sm bg-white mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-muted-foreground">
          Top Performing Organizations
        </h2>
        <button className="text-sm text-green-700 hover:underline cursor-pointer">
          View All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-1">
        {topFour.map((org, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-muted px-3 py-2 border rounded-md min-w-[220px] h-[70px] shrink-0"
          >
            <AvatarIcon className="h-[29px] w-[29px]" />
            <div>
              <p className="font-semibold text-sm text-gray-900">{org.name}</p>
              <p className="text-xs text-muted-foreground">
                Engagement : {org.engagement}% • Events : {org.events}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
