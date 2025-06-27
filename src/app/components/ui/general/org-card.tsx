import { AvatarIcon } from "./avatar-icon-component";

interface OrgCardProps {
  name: string;
  description: string;
  membersCount: number;
  avatarUrl?: string;
  isAvatarEditable?: boolean;
}

export default function OrgCard({
  name,
  description,
  membersCount,
  avatarUrl,
  isAvatarEditable = false,
}: OrgCardProps) {
  return (
    <div className="bg-white shadow-md rounded-xl px-6 py-4 w-[1097px] h-[103px] flex items-center justify-between border border-[var(--color-neutral-deep-forest-green)]">
      <div className="flex items-center gap-4">
        <AvatarIcon src={avatarUrl} alt={name} isEditable={isAvatarEditable} />
        <div>
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">
            {description} • {membersCount} Members
          </p>
        </div>
      </div>
    </div>
  );
}
