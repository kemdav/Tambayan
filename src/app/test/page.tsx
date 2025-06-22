"use client";

import { Button } from "../components/ui/button";
import { TestIcon } from "../components/icons";
import { Input } from "@/app/components/ui/input";
import { SearchIcon } from "@/app/components/icons";
import { PasswordInput } from "@/app/components/ui/password-input";
import { ResizableInput } from "@/app/components/ui/resizable-input";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-8 bg-white p-24">
      <div className="flex w-full max-w-sm flex-col gap-y-4">
        <Input placeholder="Enter your name" />
        <Input
          placeholder="Search"
          leftIcon={<SearchIcon className="h-4 w-4" />}
        />
        <PasswordInput placeholder="Password" />
        <PasswordInput placeholder="Password" defaultValue="thisismypassword" />
        <ResizableInput placeholder="resize automatic" />
      </div>

      <div className="flex w-full max-w-4xl flex-col gap-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  );
}
