"use client";

import { Button } from "@/app/components/ui/general/button";
import { PostIcon, TestIcon } from "../../components/icons";
import { useState } from "react";
import VerticalNavBar from "@/app/components/ui/general/horizontal-navigation-bar-component";
import { myButtons } from "./navBarContents";
import HorizontalNavBar from "@/app/components/ui/general/horizontal-navigation-bar-component";

export default function Test() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedNavId, setSelectedNavId] = useState<string>("post");
  return (
    <div className="grid grid-flow-col grid-rows-4 grid-cols-1 gap-4 bg-blue-100 p-10">
      <div className="flex justify-center  bg-tint-4 rounded-2xl">
        <Button onClick={() => console.log("Button Clicked")}>Default</Button>

        <Button onClick={() => console.log("Button Clicked")}>
          <TestIcon />
          With Icon
        </Button>

        <Button
          onClick={() => console.log("Button Clicked")}
          variant="destructive"
        >
          Destructive
        </Button>

        <Button onClick={() => console.log("Button Clicked")} variant="link">
          Link
        </Button>

        <Button
          onClick={() => console.log("Button Clicked")}
          variant="default"
          disabled={true}
        >
          Disabled
        </Button>
      </div>
      <div className="grid grid-flow-col row-span-3 grid-rows-4 grid-cols-5 gap-4">
        <div className="flex flex-col row-span-3">
          <Button onClick={() => console.log("Button Clicked")}>Default</Button>

          <Button onClick={() => console.log("Button Clicked")}>
            <TestIcon />
            With Icon
          </Button>

          <Button
            onClick={() => console.log("Button Clicked")}
            variant="destructive"
          >
            Destructive
          </Button>

          <Button onClick={() => console.log("Button Clicked")} variant="link">
            Link
          </Button>

          <Button
            isSelected={isSelected}
            onClick={()=>setIsSelected(!isSelected)}
            variant="navigation"
          >
            <TestIcon />
            Navigation
          </Button>

          <Button
            onClick={() => console.log("Button Clicked")}
            variant="default"
            disabled={true}
          >
            Disabled
          </Button>

          <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></HorizontalNavBar>
        </div>
        <div className="row-span-3 col-span-4 rounded-2xl"></div>
      </div>
    </div>
  );
}
