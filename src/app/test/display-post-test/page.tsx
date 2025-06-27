"use client";
import * as React from "react";
import { DisplayPostComponent } from "@/app/components/ui/general/display-post-component";

export default function DisplayPostTestPage() {
  const [likes, setLikes] = React.useState(24);
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <DisplayPostComponent
        posterName="ICPEP"
        avatarSrc={null}
        daysSincePosted={2}
        content={
          "MEOWMEOWMEOWMEOWMEOWMEOWMEOWMEOOOOOOOOOOOOOOOOASDHAJSHDKJAHSDJHAJHDKJAHSDASDASDASDSDASDASDASDASD"
        }
        imageSrc="/kemdavid.png"
        likes={likes}
        comments={2}
        onLike={handleLike}
        onComment={() => alert("Comment!")}
      />
    </div>
  );
} 