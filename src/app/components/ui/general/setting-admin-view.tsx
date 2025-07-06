"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/app/components/ui/general/input/input";
import { AvatarIcon } from "@/app/components/ui/general/avatar-icon-component";
import { DropdownStatus } from "@/app/components/ui/general/dropdown/dropdown-status";
import { Button } from "@/app/components/ui/general/button";
import {
  getTeacherProfile,
  updateTeacherProfile,
} from "@/lib/actions/settings-admin";

const departmentOptions = [
  { value: "student-affairs", label: "Student Affairs" },
  { value: "academic-affairs", label: "Academic Affairs" },
  { value: "finance", label: "Finance" },
  { value: "it", label: "IT" },
  { value: "hr", label: "Human Resources" },
];

export default function SettingAdminView() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState(departmentOptions[0].value);
  const [isSaving, setIsSaving] = useState(false);

  const teacherId = 2;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getTeacherProfile(teacherId);
        setFullName(data.fullname || "");
        setEmail(data.email || "");
        setPosition(data.position || "");
        setDepartment(data.department || departmentOptions[0].value);
        setProfilePic(data.profile || null);
      } catch (err: any) {
        console.error("Failed to fetch profile:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateTeacherProfile(teacherId, {
        fullname: fullName,
        email,
        position,
        department,
        profile: profilePic || "",
      });
      alert("Changes saved!");
    } catch (err: any) {
      console.error("Update error:", err.message);
      alert("Failed to save changes.");
    }
    setIsSaving(false);
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="card bg-white shadow-2xl w-full max-w-[629px] rounded-[15px] border-[2px] border-[#667A6B]">
        <div className="w-full px-4 py-6 sm:px-8 sm:py-8 text-[#2d3a2e]">
          <h2 className="text-[26px] font-bold mb-2">Account Settings</h2>
          <div className="border-b border-[#e3e8e1] mb-8" />

          <div className="mb-8">
            <span className="font-semibold mb-3 block">Profile Picture</span>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <AvatarIcon
                src={profilePic || ""}
                isEditable
                onImageChange={handleImageChange}
                className="h-20 w-20 rounded-full border"
              />
              <Button
                variant="outline"
                size="sm"
                className="bg-[#e6ede6] text-[#3d4d3a] px-6 py-2 rounded-lg border border-[#bfcabf] hover:bg-[#dbe7db]"
                onClick={() => {
                  const fileInput = document.querySelector(
                    'input[type="file"]'
                  ) as HTMLInputElement;
                  if (fileInput) fileInput.click();
                }}
              >
                Change Photo
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="font-semibold mb-2 block">Full Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="font-semibold mb-2 block">Email Address</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/2">
                <label className="font-semibold mb-2 block">Position</label>
                <Input
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Position"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="font-semibold mb-2 block">Department</label>
                <DropdownStatus
                  options={departmentOptions}
                  value={
                    departmentOptions.find((d) => d.value === department) ||
                    null
                  }
                  onChange={(selected) => setDepartment(selected.value)}
                  placeholder="Department"
                  widthbutton="h-12 w-full"
                  widthdropdown="w-full"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-[#e3e8e1] mt-10 mb-6" />
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              className="px-8 py-2 bg-[#e6ede6] text-[#3d4d3a] rounded-lg border border-[#bfcabf]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-2 bg-[#7b8f87] text-white rounded-lg"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
