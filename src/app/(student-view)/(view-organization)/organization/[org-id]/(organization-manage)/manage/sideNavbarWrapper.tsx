"use client"
import { AddIcon, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon, WikiIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { StepBackIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

export const myButtons: ButtonConfig[] = [
    {
        id: "back",
      children: "Back",
      href:"/profile",
      variant: "sideNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StepBackIcon className="size-10" />,
    },
    {
        id: "newsfeed",
      children: "Officers",
      variant: "sideNavigation",
      href:"officers",
      className:
        "sideNavBarButtonText",
      icon: <NewsfeedIcon className="size-10" />,
    },
    {
<<<<<<<< Updated upstream:src/app/(student-view)/(view-organization)/organization/[org-id]/(organization-manage)/manage/sideNavbarWrapper.tsx
========
        id: "upcomingEvents",
        variant: "sideNavigation",
        href:"upcoming-events",
      children: "Upcoming Events",
      className: "sideNavBarButtonText",
      icon: <AddIcon className="size-10" />,
    },
    {
>>>>>>>> Stashed changes:src/app/(student-view)/(view-organization)/organization/sideNavbarWrapper.tsx
      id: "wiki",
      variant: "sideNavigation",
      href:"wiki",
      children: "Wiki",
      className: "sideNavBarButtonText",
      icon: <WikiIcon className="size-10" />,
    },
    {
      id: "manage",
      variant: "sideNavigation",
<<<<<<<< Updated upstream:src/app/(student-view)/(view-organization)/organization/[org-id]/(organization-manage)/manage/sideNavbarWrapper.tsx
      href:"manage",
      children: "Settings",
========
      href:"manage/officers",
      children: "Managse",
>>>>>>>> Stashed changes:src/app/(student-view)/(view-organization)/organization/sideNavbarWrapper.tsx
      className: "sideNavBarButtonText",
      icon: <LogOutIcon className="size-10" />,
    }
  ];

  const SideBar = () => {
    const [selectedNavId, setSelectedNavId] = useState<string>("newsfeed");
    return (<div className="">
          <SideNavBar myButtons={myButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>
      </div>);
  }

  interface Props {
    children : React.ReactNode;
  }

  export function StudentVerticalNavigation({children}: Props){
    const params = useParams();
    return (
      <div className="relative flex flex-grow h-dvh">
        <div className="z-20 fixed">
          <SideBar></SideBar>
        </div>
        <div className="grow flex">
          {children}
        </div>
      </div>
  );
  }
