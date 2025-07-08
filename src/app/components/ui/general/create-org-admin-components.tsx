import React from "react";
import { Input } from "@/app/components/ui/general/input/input";
import { Button } from "@/app/components/ui/general/button";

interface CreateOrgAdminComponentsProps {
  orgName: string;
  onOrgNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onCreate: () => void;
}

export default function CreateOrgAdminComponents({
  orgName,
  onOrgNameChange,
  onCancel,
  onCreate,
}: CreateOrgAdminComponentsProps) {
  return (
    <div className="w-full max-w-[1089px] mx-auto mt-8">
      {/* Header Card styled like Campus Analytics */}
      <div className="w-full mb-6 bg-white p-6 border rounded-[10px] shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">
          Create New Organization
        </h1>
      </div>
      {/* Form Card */}
      <div className="w-full bg-white rounded-xl shadow-md p-8 border rounded-[10px]">
        <h2 className="text-2xl font-bold mb-6">Create New Organization</h2>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Organization Name</label>
          <Input
            placeholder="Enter organization name"
            value={orgName}
            onChange={onOrgNameChange}
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="default" onClick={onCreate} type="button">
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}
