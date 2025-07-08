import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

import {
  ShieldCheck,     // For Official Post
  MessagesSquare,  // For Community Post
  CalendarCheck,   // For Registered Events
  Calendar,        // For Upcoming Events
} from "lucide-react";


export const myButtons: ButtonConfig[] = [
  {
    id: "officialPost",
    children: "Official Post",
    variant: "horizontalNavigation",
    className: "horizontalNavBarButton",
    icon: <ShieldCheck className="horizontalNavBarButtonIcons" />,
  },
  {
    id: "communityPost",
    children: "Community Post",
    variant: "horizontalNavigation",
    className: "horizontalNavBarButton",
    icon: <MessagesSquare className="horizontalNavBarButtonIcons" />,
  },
  {
    id: "registeredEvents",
    children: "Registered Events",
    variant: "horizontalNavigation",
    className: "horizontalNavBarButton",
    icon: <CalendarCheck className="horizontalNavBarButtonIcons" />,
  },
  {
    id: "upcomingEvents",
    children: "Upcoming Events",
    variant: "horizontalNavigation",
    className: "horizontalNavBarButton",
    icon: <Calendar className="horizontalNavBarButtonIcons" />,
  },
];