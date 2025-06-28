"use client";

import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { myButtons } from "./navBarContents";

export default function SideNavBarTestPage() {
  return <SideNavBar myButtons={myButtons}></SideNavBar>;
}
