"use client";
import * as React from "react";
import { DisplayPostComponent } from "@/app/components/ui/general/display-post-component";

export default function DisplayPostTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <DisplayPostComponent
        posterName="ICPEP"
        avatarSrc={null}
        daysSincePosted={2}
        content={
          "MEOWMEOWMEOWMEOWMEOWMEOWMEOWMEOOOOOOOOOOOOOOOOASDHAJSHDKJAHSDJHAJHDKJAHSDASDASDASDSDASDASDASDASD"
        }
        imageSrc="/docs/images/supabase.local.success.png"
        likes={24}
        comments={2}
        onLike={() => alert("Liked!")}
        onComment={() => alert("Comment!")}
      />
    </div>
  );
} 