// src/app/(admin-view)/admin/nav-config.ts

import { type ButtonConfig } from "@/app/components/ui/general/button-type"; // Adjust path if needed
import { LayoutDashboard, Users, BarChart2, Calendar, Megaphone, FileCheck2, PlusCircle, KeyRound, LogOut } from "lucide-react";


// Paste the entire array definition here and make sure it's exported.
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
  { id: "logout", children: "Logout", icon: <LogOut className="size-5" /> },
];