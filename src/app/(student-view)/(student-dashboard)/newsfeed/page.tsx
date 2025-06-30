"use client";

import StudentProfileCard from "@/app/components/ui/student-view-ui/student-profile-card";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { useState } from "react";
import { myButtons } from "./navBarContents";
import StudentNewsfeedCard from "@/app/components/ui/student-view-ui/student-newsfeed-card";

export default function TagComponentTestPage() {
    const [selectedNavId, setSelectedNavId] = useState<string>("officialPost");

  return (
    <main className="w-full grid place-items-center items-start mt-10 md:mt-0">
        <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
            <StudentNewsfeedCard className="h-1/2" 
            myButtons={myButtons} 
            selectedButtonId={selectedNavId}
             onButtonSelect={setSelectedNavId}></StudentNewsfeedCard>
        </div>
    </main>
  );
} 