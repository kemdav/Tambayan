"use client"

import {Button} from "../components/ui/button"

export default function Test() {
  return (
  <div>
    <Button onClick={() => console.log("Button Clicked")}>Button Text</Button>
  </div>
  );
}
