import * as React from "react";
import { AvatarIcon } from "./avatar-icon-component";
import { Button } from "./button";
import DropDownRole from "./dropdown/dropdown-role";

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
    <div className="flex items-center gap-2 p-1 rounded-xl border bg-neutral-pure-white w-full max-w-3xl h-12">
      <AvatarIcon src={avatarSrc} alt={name} className="border-secondary-light-moss bg-white text-action-forest-green h-6 w-6 text-xs" />
      <span className="text-neutral-muted-olive font-medium text-xs flex-1 min-w-0 truncate">{name}</span>
      <DropDownRole
        options={[
          { value: "president", label: "President" },
          { value: "vice-president", label: "Vice President" },
          { value: "secretary", label: "Secretary" },
          { value: "treasurer", label: "Treasurer" },
          { value: "member", label: "Member" },
        ]}
        placeholder="Role"
        width="w-[70px]"
        height="h-7"
        dropdownTextColor="text-black text-xs"
        buttonTextColor="text-black text-xs"
      />
      <div className="min-w-[40px]" />
      <Button className="bg-primary-forest-fern/70 text-white font-semibold rounded-lg px-2 py-0.5 mx-0.5 min-w-[40px] h-6 text-[10px] hover:bg-action-fresh-green" onClick={onSave}>Save</Button>
      <Button className="bg-action-soft-rose/70 text-red-800 font-semibold rounded-lg px-2 py-0.5 mx-0.5 min-w-[40px] h-6 text-[10px] hover:bg-action-soft-rose/50" onClick={onRemove}>Remove</Button>
    </div>
  );
}; 