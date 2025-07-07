import React from "react";
import { Input } from "@/app/components/ui/general/input/input";
import DropDownRole from "@/app/components/ui/general/dropdown/dropdown-role";
import { FixedScrollTextarea } from "@/app/components/ui/general/input/fixed-scroll-textarea";
import { Button } from "@/app/components/ui/general/button";

interface Option {
  value: string;
  label: string;
}

interface CreateOrgAdminComponentsProps {
  orgName: string;
  onOrgNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  orgType: string;
  orgTypeOptions: Option[];
  onOrgTypeChange: (value: string) => void;
  description: string;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onCreate: () => void;
}

export default function CreateOrgAdminComponents({
  orgName,
  onOrgNameChange,
  orgType,
  orgTypeOptions,
  onOrgTypeChange,
  description,
  onDescriptionChange,
  onCancel,
  onCreate,
}: CreateOrgAdminComponentsProps) {
  return (
    <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Create New Organization</h2>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Organization Name</label>
        <Input
          placeholder="Enter organization name"
          value={orgName}
          onChange={onOrgNameChange}
        />
      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Organization Type</label>
        <DropDownRole
          options={orgTypeOptions}
          placeholder="Select type"
          onSelect={onOrgTypeChange}
          width="w-full"
        />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-1">Description</label>
        <FixedScrollTextarea
          placeholder="Describe the organization"
          value={description}
          onChange={onDescriptionChange}
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
  );
}
