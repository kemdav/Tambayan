"use client";

import { Users2 } from "lucide-react";

interface Props {
  totalOrg?: number;
  currentActive?: number;
}

export default function ActiveOrganization({
  currentActive = 0,
  totalOrg = 0,
}: Props) {
  const percent =
    totalOrg > 0 ? Math.round((currentActive / totalOrg) * 100) : 0;

  return (
    <div className="border rounded-lg p-4 w-full max-w-[325px] shadow-sm mt-4">
      <div className="flex justify-between items-start">
        <p className="text-sm text-muted-foreground">Active Organization</p>
        <div className="bg-muted rounded-md p-1">
          <Users2 className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="mt-2">
        <p className="text-2xl font-semibold">
          {totalOrg > 0 ? `${percent}%` : "--"}
        </p>
        <p className="text-muted-foreground text-sm">
          {currentActive} / {totalOrg}
        </p>
      </div>
    </div>
  );
}
