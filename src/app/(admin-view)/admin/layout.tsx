// In /app/admin/layout.tsx

"use client";

import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useState, useEffect } from "react";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { NewsfeedIcon } from "@/app/components/icons/NewsfeedIcon";
import { StudentProfileIcon } from "@/app/components/icons/StudentProfileIcon";
import { SubscribedOrgIcon } from "@/app/components/icons/SubscribedOrgIcon";
import { LogOutIcon } from "@/app/components/icons/LogOutIcon";
import Image from "next/image";
import { AdminUserProvider } from "./AdminUserContext";
import { AddIcon } from "@/app/components/icons/AddIcon";
import { createClient } from "@/lib/supabase/client";

// Import your icons from a consistent library like Lucide React
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Calendar,
  Megaphone,
  FileCheck2,
  PlusCircle,
  KeyRound,
  LogOut,
  Menu, // A better hamburger icon
} from "lucide-react";
import router from "next/navigation";
import { signOut } from "@/lib/actions/auth";

// Define the nav buttons directly in the layout for clarity
export const adminNavButtons: ButtonConfig[] = [
  {
    id: "dashboard",
    href: "/admin/dashboard",
    children: "Dashboard",
    icon: <LayoutDashboard className="size-5" />,
  },
  {
    id: "org-oversight",
    href: "/admin/org-oversight",
    children: "Organization Oversight",
    icon: <Users className="size-5" />,
  },
  {
    id: "analytics",
    href: "/admin/analytics",
    children: "Campus Analytics",
    icon: <BarChart2 className="size-5" />,
  },
  {
    id: "event-oversight",
    href: "/admin/event-oversight",
    children: "Event Oversight",
    icon: <Calendar className="size-5" />,
  },
  {
    id: "broadcast-tool",
    href: "/admin/broadcast-tool",
    children: "Broadcast Tool",
    icon: <Megaphone className="size-5" />,
  },
  {
    id: "accreditation",
    href: "/admin/accreditation",
    children: "Accreditation",
    icon: <FileCheck2 className="size-5" />,
  },
  {
    id: "create-org",
    href: "/admin/create-org",
    children: "Create New Organization",
    icon: <PlusCircle className="size-5" />,
  },
  {
    id: "change-password",
    href: "/admin/change-password",
    children: "Change Password",
    icon: <KeyRound className="size-5" />,
  },
  // The logout button will be rendered by the SideNavBar's internal logic
  { id: "logout", children: "Logout", icon: <LogOut className="size-5" /> },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // All hooks must be at the top, before any return or conditional
  const [selected, setSelected] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [univInfo, setUnivInfo] = useState<{
    universityid: string;
    universityemail?: string;
    uname?: string;
  } | null>(null);

  useEffect(() => {
    // Fetch university info on mount
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setUnivInfo(null);
        return;
      }
      // Adjust this query to your actual admin/university mapping
      const { data: universityProfile } = await supabase
        .from("university")
        .select("universityid, universityemail, uname")
        .eq("universityemail", user.email)
        .single();
      setUnivInfo(universityProfile || null);
    })();
  }, []);

  // Add logout handler
  const handleLogout = async () => {
    signOut();
  };

  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    (async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setUnivInfo(null);
        return;
      }
      const { data: universityProfile } = await supabase
        .from("university")
        .select("universityid, universityemail, uname")
        .eq("universityemail", user.email)
        .single();
      setUnivInfo(universityProfile || null);
    })();
  }, []);

  if (!hasMounted) {
    return null;
  }

  // This is the single source of truth for the sidebar's visual state
  const isSidebarExpanded = isNavOpen || isDesktop;

  return (
    <AdminUserProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Mobile overlay */}
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsNavOpen(false)}
          ></div>
        )}

        {/* Sidebar Wrapper for positioning */}
        <div
          className={`
            flex-shrink-0 z-30
            transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0
            fixed top-0 left-0 h-full
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* --- THE CORRECTED SideNavBar CALL --- */}
          <SideNavBar
            myButtons={adminNavButtons}
            selectedButtonId={selected}
            onButtonSelect={(id) => {
              setSelected(id);
              setIsNavOpen(false); // Always close mobile nav on selection
            }}
            // Pass the single, calculated `isExpanded` prop
            isExpanded={isSidebarExpanded}
          />
        </div>

        {/* --- MAIN CONTENT WRAPPER --- */}
        <div className="flex flex-col flex-1 w-0 overflow-y-auto">
          {/* Mobile Header */}
          <header className="p-4 md:hidden">
            <div className="flex justify-between items-center bg-white text-gray-800 p-2 rounded-lg shadow-md">
              <h1 className="text-lg font-bold">Admin Panel</h1>
              <button onClick={() => setIsNavOpen(true)} className="p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </header>

          {/* The Page Content */}
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </AdminUserProvider>
  );
}
