import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

// Utility to get a random Button variant
const buttonVariants = ["default", "destructive", "navigation", "link", "ghost"] as const;
function getRandomVariant() {
  return buttonVariants[Math.floor(Math.random() * buttonVariants.length)];
}

export function TagComponent() {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleAddTags = () => {
    const newTags = input
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0 && !tags.includes(tag));
    setTags([...tags, ...newTags]);
    setInput("");
  };

  return (
    <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary-pale-sage text-neutral-black rounded-full px-5 py-2 text-lg font-normal"
            style={{ minWidth: "2.5rem", textAlign: "center" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        
        <Input
          type="text"
          placeholder="Type tags, separated by commas"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTags();
          }}
          className="bg-secondary-pale-sage text-neutral-black focus:outline-none focus:ring-2 focus:ring-primary-moss-green"
        />
        <Button
          type="button"
          variant={"default"}
          onClick={handleAddTags}
        >
          Add
        </Button>
      </div>
      
    </div>
  );
} 