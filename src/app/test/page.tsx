"use client"

import { Button } from "../components/ui/button"
import { TestIcon } from "../components/icons";

export default function Test() {
  return (
    <div>
      <Button onClick={() => console.log("Button Clicked")}>
        <TestIcon/>
        Create Post
      </Button>
    </div>
  );
}
