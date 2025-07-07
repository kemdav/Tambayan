"use client"
import { AddIcon, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon, WikiIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { StepBackIcon } from "lucide-react";
import { useState } from "react";

export const myButtons: ButtonConfig[] = [
  {
    id: "back",
    children: "Back",
    href: "/profile",
    variant: "sideNavigation",
    className:
      "sideNavBarButtonText",
    icon: <StepBackIcon className="size-10" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "newsfeed",
    className:
      "sideNavBarButtonText",
    icon: <NewsfeedIcon className="size-10" />,
  },
  {
    id: "wiki",
    variant: "sideNavigation",
    href: "wiki",
    children: "Wiki",
    className: "sideNavBarButtonText",
    icon: <WikiIcon className="size-10" />,
  },
  {
    id: "officers",
    variant: "sideNavigation",
    href: "officers",
    children: "Officers",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  },
  {
    id: "accreditation",
    variant: "sideNavigation",
    href: "accreditation",
    children: "Accreditation",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  }
];

const SideBar = ({ isOfficer }: { isOfficer: boolean }) => {
  const [selectedNavId, setSelectedNavId] = useState<string>("newsfeed");
  const visibleButtons = myButtons.filter(button => {
    if (button.id === 'officers' || button.id === 'settings') {
      return isOfficer;
    }
    return true;
  });
  console.log("VISIBLE BUTTONS", visibleButtons);
  console.log("PERMISSION", isOfficer);
  return (<div className="">
    <SideNavBar myButtons={visibleButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>
  </div>);
}

interface Props {
  children: React.ReactNode;
}

export function StudentVerticalNavigation({ children, isOfficer }: { children: React.ReactNode, isOfficer: boolean }) {
  return (
    <div className="relative flex flex-grow h-dvh">
      <div className="z-20 fixed">
        <SideBar isOfficer={isOfficer} ></SideBar>
      </div>
      <div className="grow flex">
        {children}
      </div>
    </div>
  );
}
