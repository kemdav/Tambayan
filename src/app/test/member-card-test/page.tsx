"use client";
import * as React from "react";
import { MemberCardComponent } from "@/app/components/ui/member-card-component";

export default function MemberCardTestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-cloud-white p-8">
      <MemberCardComponent
        name="Ma. Angelica May A. Mantalaba"
        avatarSrc={null}
        onSave={() => alert("Save clicked!")}
        onRemove={() => alert("Remove clicked!")}
      />
    </div>
  );
} 