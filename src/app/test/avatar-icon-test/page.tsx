"use client";

import { AvatarIcon } from "@/app/components/ui/general/avatar-icon-component";

export default function AvatarIconTestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-white p-8">
      <div className="mt-8 flex flex-col items-center gap-4">
        <p className="text-gray-600">Click the avatar to upload an image.</p>
        <AvatarIcon className="h-32 w-32" isClickable={true} onAvatarClicked={()=>console.log("Test")}/>
      </div>
    </div>
  );
} 