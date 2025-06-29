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
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Props {
  myButtons: ButtonConfig[];
  selectedButtonId: string;
  onButtonSelect: (id: string) => void; 
}

export default function SideNavBar({myButtons, selectedButtonId, onButtonSelect}:Props) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);


  return (
    <main className={`h-screen transition-all duration-500 ease-in-out ${isNavOpen ? 'bg-tint-forest-fern w-70' : 'w-15 bg-action-forest-green/0'}`}>
      <div className="flex items-center">
        <TambayanIcon className="size-20"></TambayanIcon>
        <TambayanTextIcon className=""></TambayanTextIcon>
        <Button className="bg-white/0 hover:bg-white/0" onClick={()=>setIsNavOpen(!isNavOpen)}><NavigationButtonIcon className="size-10 text-secondary-light-moss"></NavigationButtonIcon></Button>
      </div>

      <div>
        <ButtonList buttons={myButtons} className={`flex flex-col ${isNavOpen ? 'duration-1000' : '-translate-x-100'}`} selectedId={selectedButtonId} onButtonClick={onButtonSelect}/>
      </div>
    </main>
  );
}
