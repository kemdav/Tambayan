"use client";

import DropdownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { DropdownStatus } from "@/app/components/ui/general/dropdown/dropdown-status";

const roleOptions = [
  { value: "member", label: "Member" },
  { value: "president", label: "President" },
  { value: "vice-president", label: "Vice President" },
  { value: "secretary", label: "Secretary" },
  { value: "treasurer", label: "Treasurer" },
  { value: "test", label: "Test" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "inactive", label: "Inactive" },
  { value: "archived", label: "Archived" },
  { value: "banned", label: "Banned" },
];

// use the global.css components instead of hex on actual pages

export default function Home() {
  return (
    <main className="flex flex-col space-y-4 items-center mt-50">
      <h1 className="text-2xl font-bold mb-4">Combobox Demo</h1>
      <div className="flex space-x-70 mt-10">
        <DropdownRole
          // Placeholder and Size
          placeholder="Select Role"
          // Options
          options={roleOptions}
        />

        <DropdownStatus
          // Button
          label="User Status"
          options={statusOptions}
          // Placeholder and Size
          placeholder="Choose status"
          widthbutton="w-[180px]"
          heightbutton="h-11"
          // Colors
          buttonTextColor="text-[#1E3A8A]"
          buttonBorderColor="border-[#1E3A8A]"
          buttonBgColor="bg-white"
          buttonHoverTextColor="hover:text-white"
          buttonHoverBgColor="hover:bg-[#1E3A8A]"
          buttonActiveBgColor="active:bg-[#1E40AF]"
          // Dropdown Size
          widthdropdown="w-[180px]"
          // Dropdown Colors
          dropdownTextColor="text-[#1E3A8A]"
          dropdownBorderColor="border-[#1E3A8A]"
          dropdownBgColor="bg-white"
          dropdownHoverTextColor="hover:text-white"
          dropdownHoverBgColor="hover:bg-[#1E3A8A]"
          dropdownActiveBgColor="active:bg-[#1E40AF]"
        />
      </div>
    </main>
  );
}
