import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";

interface MemberCardComponentProps {
  name: string;
  avatarSrc?: string | null;
  onSave?: () => void;
  onRemove?: () => void;
}

export const MemberCardComponent: React.FC<MemberCardComponentProps> = ({
  name,
  avatarSrc,
  onSave,
  onRemove,
}) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-2xl border bg-neutral-pure-white w-full max-w-2xl">
      <AvatarIcon src={avatarSrc} alt={name} className="border-secondary-light-moss bg-white text-action-forest-green h-8 w-8 text-base" />
      <span className="text-neutral-muted-olive font-medium text-sm flex-1 min-w-0 truncate">{name}</span>
      <div className="min-w-[90px]" />
      <Button className="bg-primary-forest-fern/70 text-white font-semibold rounded-lg px-3 py-1 mx-1 min-w-[70px] h-7 text-xs hover:bg-action-fresh-green" onClick={onSave}>Save</Button>
      <Button className="bg-action-soft-rose/70 text-red-800 font-semibold rounded-lg px-3 py-1 mx-1 min-w-[70px] h-7 text-xs hover:bg-action-soft-rose/50" onClick={onRemove}>Remove</Button>
    </div>
  );
}; 