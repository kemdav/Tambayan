"use client";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useState } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { NewsfeedIcon } from "@/app/components/icons/NewsfeedIcon";
import { StudentProfileIcon } from "@/app/components/icons/StudentProfileIcon";
import { SubscribedOrgIcon } from "@/app/components/icons/SubscribedOrgIcon";
import { LogOutIcon as SettingsIcon } from "@/app/components/icons/LogOutIcon";
import Image from "next/image";

const navButtons: ButtonConfig[] = [
  { id: "dashboard", children: "Dashboard", icon: <img src="/dashboard.svg" alt="Dashboard" className="w-4 h-5" />, href: "/admin/dashboard" },
  { id: "org-oversight", children: "Organization Oversight", icon: <StudentProfileIcon />, href: "/admin/org-oversight" },
  { id: "analytics", children: "Campus Analytics", icon: <img src="/analytics.svg" alt="Analytics" className="w-4 h-5" />, href: "/admin/analytics" },
  { id: "event-oversight", children: "Event Oversight", icon: <SubscribedOrgIcon />, href: "/admin/event-oversight" },
  { id: "broadcast-tool", children: "Broadcast Tool", icon: <NewsfeedIcon />, href: "/admin/broadcast-tool" },
  { id: "accreditation", children: "Accreditation", icon: <img src="/accredit.svg" alt="Accreditation" className="w-4 h-5" />, href: "/admin/accreditation" },
  { id: "settings", children: "Settings", icon: <SettingsIcon />, href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState("dashboard");
  return (
    <div className="flex">
      <SideNavBar myButtons={navButtons} selectedButtonId={selected} onButtonSelect={setSelected} />
      <div className="flex-1 bg-neutral-mint-white min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
} 