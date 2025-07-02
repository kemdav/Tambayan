"use client";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useState } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { NewsfeedIcon } from "@/app/components/icons/NewsfeedIcon";
import { StudentProfileIcon } from "@/app/components/icons/StudentProfileIcon";
import { SubscribedOrgIcon } from "@/app/components/icons/SubscribedOrgIcon";
import { UniversityIcon } from "@/app/components/icons/UniversityIcon";
import { LogOutIcon as SettingsIcon } from "@/app/components/icons/LogOutIcon";

const navButtons: ButtonConfig[] = [
  { id: "dashboard", children: "Dashboard", icon: <UniversityIcon /> },
  { id: "org-oversight", children: "Organization Oversight", icon: <StudentProfileIcon /> },
  { id: "analytics", children: "Campus Analytics", icon: <NewsfeedIcon /> },
  { id: "event-oversight", children: "Event Oversight", icon: <SubscribedOrgIcon /> },
  { id: "broadcast-tool", children: "Broadcast Tool", icon: <NewsfeedIcon /> },
  { id: "accreditation", children: "Accreditation", icon: <UniversityIcon /> },
  { id: "settings", children: "Settings", icon: <SettingsIcon /> },
];

export default function AccreditationPage() {
  return <div className="flex items-center justify-center min-h-screen"><h1 className="text-3xl font-bold">Accreditation Page</h1></div>;
}
