"use client"

import { Button } from "../../components/ui/button"
import { TestIcon } from "../../components/icons";

export default function Test() {
  return (
    <div className="flex">
      <Button onClick={() => console.log("Button Clicked")}>
        Default
      </Button>

      <Button onClick={() => console.log("Button Clicked")}>
        <TestIcon/>
        With Icon
      </Button>

      <Button onClick={() => console.log("Button Clicked")} variant="destructive">
        Destructive
      </Button>

      <Button onClick={() => console.log("Button Clicked")} variant="outline">
        Outline
      </Button>
    </div>
  );
}
