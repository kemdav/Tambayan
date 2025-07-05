"use client"
import { AddIcon, AddIcon2, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import SearchBar from "@/app/components/ui/student-view-ui/search-bar";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const myButtons: ButtonConfig[] = [
  {
    id: "profile",
    children: "Student Profile",
    href: "/profile",
    variant: "sideNavigation",
    className:
      "sideNavBarButtonText",
    icon: <StudentProfileIcon className="size-10" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "/newsfeed",
    className:
      "sideNavBarButtonText",
    icon: <NewsfeedIcon className="size-10" />,
  },
  {
    id: "sub-org",
    children: "Subscribed Organizations",
    variant: "sideNavigation",
    href: "/subscribed",
    className:
      "sideNavBarButtonText",
    icon: <SubscribedOrgIcon className="size-10" />,
  },
  {
    id: "join-org",
    variant: "sideNavigation",
    href: "/join",
    children: "Join Organization",
    className: "sideNavBarButtonText",
    icon: <AddIcon className="size-10" />,
  },
  {
    id: "logout",
    variant: "sideNavigation",
    href: "/login",
    children: "Logout",
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

function CreatePost() {
  <CreatePostComponent></CreatePostComponent>
}

export default function StudentVerticalNavigation({ children }: Props) {

  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [selectedNavId, setSelectedNavId] = useState<string>("profile");

  return (
    <>
      {isCreatePostOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setCreatePostOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreatePostComponent/>
          </div>
        </div>
      )}

      <div className="relative flex h-dvh">
        <div className="z-20 fixed overflow-y-auto">
          <SideBar></SideBar>
        </div>
        <div className="flex-grow flex flex-col items-center pt-5">
          <SearchBar className="w-full max-w-4xl"></SearchBar>
          {children}
        </div>
        <div className="z-20 fixed bottom-0 right-0 sm:mx-10 sm:my-10 opacity-50 md:opacity-100">
          <Button className="size-15 sm:size-20 bg-black/0 hover:bg-black/0 hover:scale-110 transition delay-10 duration-300 ease-in-out hover:-translate-y-1"
            onClick={() => setCreatePostOpen(true)}><AddIcon2 className="size-15 sm:size-20 text-action-moss-green"></AddIcon2></Button>
        </div>

      </div>
    </>
  );
}
