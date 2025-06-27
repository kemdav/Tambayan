"use client"
import { ButtonList } from "@/app/components/ui/general/button-list";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import {
  AddIcon,
  NewsfeedIcon,
  StudentProfileIcon,
  SubscribedOrgIcon,
  UserPofileLoginIcon,
  TambayanTextIcon,
  TambayanIcon,
  NavigationButtonIcon,
} from "@/app/components/icons";
import { Button } from "./button";
import { useState } from "react";

export default function SideNavBar() {
  const myButtons: ButtonConfig[] = [
    {
      children: "Student Profile",
      className:
        "sideNavBarButtonText",
      icon: <StudentProfileIcon className="size-10" />,
    },
    {
      children: "Newsfeed",
      className:
        "sideNavBarButtonText",
      icon: <NewsfeedIcon className="size-10" />,
    },
    {
      children: "Subscribed Organizations",
      className:
        "sideNavBarButtonText",
      icon: <SubscribedOrgIcon className="size-10" />,
    },
    {
      children: "Join Organization",
      className: "sideNavBarButtonText",
      icon: <AddIcon className="size-10" />,
    },
  ];

  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    <main className={`bg-tint-forest-fern h-screen transition-all duration-500 ease-in-out ${isNavOpen ? 'w-70' : 'w-15'}`}>
      <div className="flex items-center">
        <TambayanIcon className="size-20"></TambayanIcon>
        <TambayanTextIcon className=""></TambayanTextIcon>
        <Button className="bg-white/0 hover:bg-white/0" onClick={()=>setIsNavOpen(!isNavOpen)}><NavigationButtonIcon className="size-10 text-secondary-light-moss"></NavigationButtonIcon></Button>
      </div>

      <div>
        <ButtonList buttons={myButtons} className="flex flex-col gap-3" />
      </div>
    </main>
  );
}
