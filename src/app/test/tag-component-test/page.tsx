"use client";

import React from "react";
import { TagComponent } from "@/app/components/ui/tag-component";

import { AvatarIcon } from "@/app/components/ui/avatar-icon-component";

export default function TagComponentTestPage() {
  return (
    <div className="min-h-screen bg-secondary-deep-fern flex flex-col items-center justify-center p-8">
        <div className="mt-8 flex flex-col items-center gap-4">
        <AvatarIcon isEditable className="h-32 w-32" />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-neutral-linen-white"></h1>
      <TagComponent />
    </div>
  );
} 