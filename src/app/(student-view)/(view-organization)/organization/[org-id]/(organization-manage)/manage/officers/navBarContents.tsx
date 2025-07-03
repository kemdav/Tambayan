import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

export const myButtons: ButtonConfig[] = [
    {
        id: "member",
      children: "Member Management",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "content",
      children: "Content Management",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    }
  ];