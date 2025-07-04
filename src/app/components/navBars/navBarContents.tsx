import { AddIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { ButtonConfig } from "@/app/components/ui/general/button-type";

export const ProfileViewNavBarContents: ButtonConfig[] = [
    {
        id: "post",
      children: "Post",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "comment",
      children: "Comment",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
    {
        id: "about",
      children: "About",
      variant: "horizontalNavigation",
      className:
        "horizontalNavBarButton",
      icon: <StudentProfileIcon className="horizontalNavBarButtonIcons" />,
    },
  ];