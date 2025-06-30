import React from "react";
import { Button } from "./button";
import { Input } from "./input/input";

interface TagComponentProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (input: string) => void;
  onAddTag: () => void;
  onRemoveTag?: (tag: string) => void;
}

export function TagComponent({ tags, tagInput, onTagInputChange, onAddTag, onRemoveTag }: TagComponentProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-secondary-pale-sage text-neutral-black rounded-full px-5 py-2 text-lg font-normal flex items-center gap-1"
            style={{ minWidth: "2.5rem", textAlign: "center" }}
          >
            {tag}
            {onRemoveTag && (
              <button type="button" className="ml-1 text-xs text-red-500" onClick={() => onRemoveTag(tag)}>x</button>
            )}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Type tags"
          value={tagInput}
          onChange={e => onTagInputChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") onAddTag();
          }}
          className="bg-secondary-pale-sage text-neutral-black focus:outline-none focus:ring-2 focus:ring-primary-moss-green"
        />
        <Button
          type="button"
          variant={"default"}
          onClick={onAddTag}
        >
          Add
        </Button>
      </div>
    </div>
  );
} 