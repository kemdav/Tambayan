import { AvatarIcon } from "../avatar-icon-component";

export default function FirstHeader() {
  return (
    <div className="w-full max-w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border rounded-[10px] p-4 bg-white shadow-md">
      <h1 className="text-xl sm:text-2xl font-medium">Campus Analytics</h1>

      <div className="flex items-center gap-2 text-sm">
        <AvatarIcon className="w-8 h-8 sm:w-10 sm:h-10" />
        <span className="text-sm">Admin User</span>
      </div>
    </div>
  );
}
