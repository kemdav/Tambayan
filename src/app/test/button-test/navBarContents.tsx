import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

export const myButtons: ButtonConfig[] = [
    {
        id: "post",
      children: "Post",
      variant: "horizontalNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
    {
        id: "comment",
      children: "Comment",
      variant: "horizontalNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
    {
        id: "about",
      children: "About",
      variant: "horizontalNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
  ];