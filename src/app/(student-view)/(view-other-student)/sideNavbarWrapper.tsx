"use client"
import { AddIcon, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon, TambayanIcon, TambayanTextIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { ArrowLeft, StepBackIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const myButtons: ButtonConfig[] = [
  {
    id: "back",
    children: "Back",
    href: "/profile",
    variant: "sideNavigation",
    className:
      "sideNavBarButtonText",
    icon: <ArrowLeft className="size-5" />,
  }
];

const SideBar = ({ onButtonSelect, isExpanded }: {
  onButtonSelect: (id: string) => void;
  isExpanded: boolean;
}) => {
  // No need for selected state if there's only one button
  return (
    <SideNavBar
      myButtons={myButtons}
      selectedButtonId={"back"}
      onButtonSelect={onButtonSelect}
      isExpanded={isExpanded}
    />
  );
};


interface Props {
  children: React.ReactNode;
}

export function StudentVerticalNavigation({ children }: Props) {
  const [selectedNavId, setSelectedNavId] = useState<string>("back");
  const [hasMounted, setHasMounted] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const isSidebarExpanded = isNavOpen || isDesktop;
    if (!hasMounted) {
    return null; 
  }
  return (
    <div className="flex h-screen bg-gray-50">

      {isNavOpen && (<div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsNavOpen(false)}></div>)}

      <div
        className={`
            flex-shrink-0 z-30 bg-white shadow-lg
            transform transition-transform duration-300 ease-in-out
            md:relative md:shadow-none md:translate-x-0
            fixed top-0 left-0 h-full
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
      >
        <SideBar
          onButtonSelect={() => setIsNavOpen(false)}
          isExpanded={isSidebarExpanded}
        />
      </div>

      <div className="flex flex-col flex-1 w-0 overflow-y-auto">
        {/* Mobile Header */}
        <div className="p-4 md:hidden">
          <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              <TambayanIcon className="h-8 w-8" />
            </div>
            <button onClick={() => setIsNavOpen(true)} className="p-2">
              <NavigationButtonIcon className="h-6 w-6" />
            </button>
          </div>
        </div>


        <main className="flex-1 bg-gray-50">
          <div className="grow flex">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
