"use client";

import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { myButtons } from "./navBarContents";
import { useState } from "react";

export default function SideNavBarTestPage() {
  const [selectedNavId, setSelectedNavId] = useState<string>("profile");
  return <SideNavBar myButtons={myButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>;
}
