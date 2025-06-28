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

interface Props {
  myButtons: ButtonConfig[];
  selectedButtonId: string;
  onButtonSelect: (id: string) => void; 
}

export default function HorizontalNavBar({myButtons, selectedButtonId, onButtonSelect}:Props) {

  return (
    <main>
      <div>
        <ButtonList buttons={myButtons} className="flex" selectedId={selectedButtonId} onButtonClick={onButtonSelect}/>
      </div>
    </main>
  );
}
