"use client";

import React, { useState } from "react";
import { Input } from "@/app/components/ui/general/input/input";
import { AvatarIcon } from "@/app/components/ui/general/avatar-icon-component";
import { DropdownStatus } from "@/app/components/ui/general/dropdown/dropdown-status";
import { Button } from "@/app/components/ui/general/button";

const departmentOptions = [
  { value: "student-affairs", label: "Student Affairs" },
  { value: "academic-affairs", label: "Academic Affairs" },
  { value: "finance", label: "Finance" },
  { value: "it", label: "IT" },
  { value: "hr", label: "Human Resources" },
];

export default function SettingAdminView() {
  const [profilePic, setProfilePic] = useState<string | null>(
    "https://randomuser.me/api/portraits/women/44.jpg"
  );
  const [fullName, setFullName] = useState("Admin User");
  const [email, setEmail] = useState("admin@university.edu");
  const [position, setPosition] = useState("School Administrator");
  const [department, setDepartment] = useState(departmentOptions[0].value);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Changes saved!");
    }, 1000);
  };

  const handleCancel = () => {
    setFullName("Admin User");
    setEmail("admin@university.edu");
    setPosition("School Administrator");
    setDepartment(departmentOptions[0].value);
    setProfilePic("https://randomuser.me/api/portraits/women/44.jpg");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
        className="card bg-white shadow-2xl flex justify-center transition-shadow duration-300 hover:shadow-[0_8px_32px_0_rgba(102,122,107,0.15)] w-full max-w-[629px] h-auto"
        style={{
          border: '2px solid #667A6B',
          borderRadius: 15,
        }}
      >
        <div className="w-full px-4 py-6 sm:px-8 sm:py-8 flex flex-col font-sans text-[#2d3a2e]" style={{minHeight: '100%'}}>
          <h2 className="text-[22px] sm:text-[26px] font-bold mb-2 text-left tracking-tight mt-2">Account Settings</h2>
          <div className="border-b border-[#e3e8e1] mb-8" />
          <div className="flex flex-col items-start mb-8">
            <span className="text-[16px] sm:text-[17px] font-semibold mb-3 text-left text-[#3d4d3a]">Profile Picture</span>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 w-full">
              <AvatarIcon
                src={profilePic}
                isEditable
                onImageChange={handleImageChange}
                className="mb-2 h-20 w-20 rounded-full border border-[#e3e8e1] shadow-sm"
              />
              <Button
                variant="outline"
                size="sm"
                className="mb-2 mt-0 bg-[#e6ede6] text-[#3d4d3a] font-semibold text-[15px] sm:text-[16px] px-5 sm:px-6 py-2 rounded-lg border border-[#bfcabf] shadow hover:bg-[#dbe7db] hover:text-[#2d3a2e] transition-colors duration-200"
                onClick={() => {
                  if (document.querySelector('input[type="file"]')) {
                    (document.querySelector('input[type="file"]') as HTMLInputElement).click();
                  }
                }}
              >
                Change Photo
              </Button>
            </div>
          </div>
          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-left text-[#3d4d3a]">Full Name</label>
              <Input
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Full Name"
                className="h-11 sm:h-12 text-[15px] sm:text-[16px] placeholder-[#bfcabf] border border-[#667A6B] border-[1.5px] rounded-[8px] bg-transparent focus:border-[#7b8f87] focus:ring-2 focus:ring-[#7b8f87] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-left text-[#3d4d3a]">Email Address</label>
              <Input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                className="h-11 sm:h-12 text-[15px] sm:text-[16px] placeholder-[#bfcabf] border border-[#667A6B] border-[1.5px] rounded-[8px] bg-transparent focus:border-[#7b8f87] focus:ring-2 focus:ring-[#7b8f87] transition-all duration-200"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
              <div className="w-full sm:w-1/2">
                <label className="block text-[16px] font-semibold mb-2 text-left text-[#3d4d3a] leading-none">Position</label>
                <Input
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  placeholder="Position"
                  className="h-12 w-full text-[16px] px-4 placeholder-[#bfcabf] border border-[#667A6B] border-[1.5px] rounded-[8px] bg-transparent focus:border-[#7b8f87] focus:ring-2 focus:ring-[#7b8f87] transition-all duration-200"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-[16px] font-semibold mb-2 text-left text-[#3d4d3a] leading-none">Department</label>
                <DropdownStatus
                  label=""
                  options={departmentOptions}
                  placeholder="Select Department"
                  widthbutton="h-12 w-full text-[16px] px-4 border border-[#667A6B] border-[1.5px] rounded-[8px] bg-transparent focus-visible:border-[#7b8f87] focus-visible:ring-2 focus-visible:ring-[#7b8f87] shadow-none placeholder-[#bfcabf] transition-all duration-200"
                  widthdropdown="w-full"
                />
              </div>
            </div>
          </div>
          <div className="border-t border-[#e3e8e1] mt-10 mb-6" />
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-2">
            <Button variant="outline" onClick={handleCancel} disabled={isSaving} className="px-8 py-2 bg-[#e6ede6] text-[#3d4d3a] font-semibold text-[15px] sm:text-[16px] rounded-lg border border-[#bfcabf] shadow hover:bg-[#dbe7db] hover:text-[#2d3a2e] transition-colors duration-200">
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving} className="px-8 py-2 bg-[#7b8f87] text-white font-semibold text-[15px] sm:text-[16px] rounded-lg border-none shadow hover:bg-[#5e7263] transition-colors duration-200">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
