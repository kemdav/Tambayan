"use client";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useEffect, useState } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { NewsfeedIcon } from "@/app/components/icons/NewsfeedIcon";
import { StudentProfileIcon } from "@/app/components/icons/StudentProfileIcon";
import { SubscribedOrgIcon } from "@/app/components/icons/SubscribedOrgIcon";
import { LogOutIcon as SettingsIcon } from "@/app/components/icons/LogOutIcon";
import Image from "next/image";
import { AddIcon } from "@/app/components/icons/AddIcon";

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
  {
    id: "dashboard",
    children: "Dashboard",
    icon: <img src="/dashboard.svg" alt="Dashboard" className="w-4 h-5" />,
    href: "/admin/dashboard",
  },
  {
    id: "org-oversight",
    children: "Organization Oversight",
    icon: <StudentProfileIcon />,
    href: "/admin/org-oversight",
  },
  {
    id: "analytics",
    children: "Campus Analytics",
    icon: <img src="/analytics.svg" alt="Analytics" className="w-4 h-5" />,
    href: "/admin/analytics",
  },
  {
    id: "event-oversight",
    children: "Event Oversight",
    icon: <SubscribedOrgIcon />,
    href: "/admin/event-oversight",
  },
  {
    id: "broadcast-tool",
    children: "Broadcast Tool",
    icon: <NewsfeedIcon />,
    href: "/admin/broadcast-tool",
  },
  {
    id: "accreditation",
    children: "Accreditation",
    icon: <img src="/accredit.svg" alt="Accreditation" className="w-4 h-5" />,
    href: "/admin/accreditation",
  },
  {
    id: "create-org",
    children: "Create New Organization",
    icon: <AddIcon className="w-5 h-5" />,
    href: "/admin/create-org",
  },
  {
    id: "settings",
    children: "Settings",
    icon: <SettingsIcon />,
    href: "/admin/settings",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selected, setSelected] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  const handleSelect = (id: string) => {
    setSelected(id);
    setIsNavOpen(false); // Close mobile nav on selection
  };

  const isSidebarExpanded = isNavOpen || isDesktop;
    if (!hasMounted) {
    return null; 
  }
  return (
    <div className="flex h-screen bg-neutral-mint-white">

       {isNavOpen && (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
                onClick={() => setIsNavOpen(false)}
            ></div>
        )}

         <div
          className={`
            flex-shrink-0 z-30 bg-white shadow-xl
            transform transition-transform duration-300 ease-in-out
            md:relative md:shadow-none md:translate-x-0
            fixed top-0 left-0 h-full
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* We only need one instance of SideNavBar */}
          <SideNavBar
            myButtons={navButtons}
            selectedButtonId={selected}
            onButtonSelect={handleSelect}
            isExpanded={isSidebarExpanded}
          />
        </div>


      <div className="flex flex-col flex-1 w-0 overflow-y-auto">
        {/* Mobile Header */}
        <div className="p-4 md:hidden">
          <div className="flex justify-between items-center bg-tint-forest-fern text-white p-4 rounded-lg shadow-lg">
            <div className="font-bold text-xl">Admin Panel</div>
            <button onClick={() => setIsNavOpen(true)} className="cursor-pointer">
              <HamburgerIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* The actual page content, now inside the scrollable area */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
