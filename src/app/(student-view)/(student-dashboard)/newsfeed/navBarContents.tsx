import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

export const myButtons: ButtonConfig[] = [
    {
        id: "officialPost",
      children: "Official Post",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "communityPost",
      children: "Community Post",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "registeredEvents",
      children: "Registered Events",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "upcomingEvents",
      children: "Upcoming Events",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
  ];