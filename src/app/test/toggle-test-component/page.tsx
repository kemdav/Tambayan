"use-client"

import { Italic } from "lucide-react"
import { Toggle } from "@/app/components/ui/toggle"

export default function ToggleOutline() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-8 bg-gray-400 p-24">
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
    </div>
  )
}