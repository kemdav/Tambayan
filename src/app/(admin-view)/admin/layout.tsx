// In /app/admin/layout.tsx

"use client";

import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { adminNavButtons } from "./nabBarContents"; 
import { AdminUserProvider, useAdminUser } from "./AdminUserContext";
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
import router, { useRouter } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // All hooks must be at the top, before any return or conditional
  const [selected, setSelected] = useState("dashboard");
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useAdminUser();

  // Debug state for university info
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
  // Debug button handler
  const handleCheckUniversity = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("No authenticated user found");
      return;
    }
    const { data: universityProfile, error } = await supabase
      .from("university")
      .select("universityid, universityemail, uname")
      .eq("universityemail", user.email)
      .single();
    if (error || !universityProfile) {
      alert("No university found for this email: " + user.email);
      setUnivInfo(null);
    } else {
      setUnivInfo(universityProfile);
      alert(
        `University ID: ${universityProfile.universityid}\nUniversity Email: ${universityProfile.universityemail}\nUniversity Name: ${universityProfile.uname}`
      );
    }
  };
  if (!hasMounted) {
    return null;
  }

  // This is the single source of truth for the sidebar's visual state
  const isSidebarExpanded = isNavOpen || isDesktop;

  // Restrict staff from accessing /admin/staff
  const isStaff =
    user?.user_metadata?.role === "TSG" ||
    user?.user_metadata?.role === "staff";
  const isStaffPage =
    typeof window !== "undefined" &&
    window.location.pathname === "/admin/staff";
  if (!loading && isStaff && isStaffPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Access Denied
          </h1>
          <p className="text-gray-700">
            You do not have permission to view this page.
          </p>
        </div>
      </div>
    );
  }

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
