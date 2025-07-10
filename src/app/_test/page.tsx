"use client";

import { Button } from "@/app/components/ui/general/button";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-y-8 bg-gray-500 p-24">
      <div className="flex w-full max-w-4xl flex-col gap-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
         
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  );
}
