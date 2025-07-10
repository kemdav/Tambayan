import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

export const myButtons: ButtonConfig[] = [
    {
        id: "profile",
      children: "Student Profile",
      variant: "sideNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
    {
        id: "newsfeed",
      children: "Newsfeed",
      variant: "sideNavigation",
      className:
        "sideNavBarButtonText",
      icon: <NewsfeedIcon className="size-10" />,
    },
    {
        id: "sub-org",
      children: "Subscribed Organizations",
      variant: "sideNavigation",
      className:
        "sideNavBarButtonText",
      icon: <SubscribedOrgIcon className="size-10" />,
    },
    {
        id: "join-org",
        variant: "sideNavigation",
      children: "Join Organization",
      className: "sideNavBarButtonText",
      icon: <AddIcon className="size-10" />,
    },
  ];