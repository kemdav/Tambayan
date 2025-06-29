"use client"
import { AddIcon, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { useState } from "react";

export const myButtons: ButtonConfig[] = [
    {
        id: "profile",
      children: "Back",
      href:"/profile",
      variant: "sideNavigation",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
    {
        id: "newsfeed",
      children: "Official Post",
      variant: "sideNavigation",
      href:"/newsfeed",
      className:
        "sideNavBarButtonText",
      icon: <NewsfeedIcon className="size-10" />,
    },
    {
        id: "sub-org",
      children: "Community Post",
      variant: "sideNavigation",
      href:"/subscribed",
      className:
        "sideNavBarButtonText",
      icon: <SubscribedOrgIcon className="size-10" />,
    },
    {
        id: "join-org",
        variant: "sideNavigation",
        href:"/join",
      children: "Upcoming Events",
      className: "sideNavBarButtonText",
      icon: <AddIcon className="size-10" />,
    },
    {
      id: "logout",
      variant: "sideNavigation",
      href:"/login",
      children: "Wiki",
      className: "sideNavBarButtonText",
      icon: <LogOutIcon className="size-10" />,
    }
  ];

  const SideBar = () => {
    const [selectedNavId, setSelectedNavId] = useState<string>("profile");
    return (<div className="">
          <SideNavBar myButtons={myButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>
      </div>);
  }

  interface Props {
    children : React.ReactNode;
  }

  export function StudentVerticalNavigation({children}: Props){
    return (
      <div className="relative flex h-dvh">
        <div className="z-20 fixed">
          <SideBar></SideBar>
        </div>
        <div className="grow flex">
          {children}
        </div>
      </div>
  );
  }
