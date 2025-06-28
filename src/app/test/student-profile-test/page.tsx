"use client";

import StudentProfileCard from "@/app/components/ui/student-view-ui/student-profile-card";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { useState } from "react";
import { myButtons } from "./navBarContents";

export default function TagComponentTestPage() {
    const [selectedNavId, setSelectedNavId] = useState<string>("post");

  return (
    <main className="w-full">
        <div className="h-dvh max-w-6xl">
            <StudentProfileHeader isEditable={false}></StudentProfileHeader>
            <StudentProfileCard className="h-1/2" 
            myButtons={myButtons} 
            selectedButtonId={selectedNavId}
             onButtonSelect={setSelectedNavId}
             studentId="23-3788-246"
    studentCourse="Computer Science"
    studentEmail="kemphilip.david@cit.edu"
    studentYear="3rd Year"
    studentJoinDate="September 17, 2004"
    studentEventsJoined="6"
    studentTotalOrg="3"></StudentProfileCard>
        </div>
    </main>
  );
} 