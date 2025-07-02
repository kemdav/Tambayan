"use client";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useState } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { NewsfeedIcon } from "@/app/components/icons/NewsfeedIcon";
import { StudentProfileIcon } from "@/app/components/icons/StudentProfileIcon";
import { SubscribedOrgIcon } from "@/app/components/icons/SubscribedOrgIcon";
import { LogOutIcon as SettingsIcon } from "@/app/components/icons/LogOutIcon";
import Image from "next/image";

// A simple hamburger icon component for clarity
const HamburgerIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor" // Inherits color from parent's text-color
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
    />
  </svg>
);


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
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleSelect = (id: string) => {
    setSelected(id);
    setIsNavOpen(false);
  };

  return (
    <div className="relative min-h-screen md:flex">

      <div className="p-4 md:hidden">

        <div className="flex justify-between items-center bg-tint-forest-fern text-white p-4 rounded-[20px] shadow-lg">
          <div className="font-bold text-xl">Admin Panel</div>
          <button onClick={() => setIsNavOpen(true)} className="cursor-pointer">
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
          onClick={() => setIsNavOpen(false)}
        ></div>
      )}

      <div
        className={`
          fixed top-0 left-0 h-full z-30
          transform transition-transform duration-300 ease-in-out
          ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          
          md:relative md:translate-x-0 md:z-auto
        `}
      >
        <SideNavBar
          myButtons={navButtons}
          selectedButtonId={selected}
          onButtonSelect={handleSelect}
        />
      </div>

      <main className="flex-1 bg-neutral-mint-white min-h-screen p-4">
        {children}
      </main>
    </div>
  );
}