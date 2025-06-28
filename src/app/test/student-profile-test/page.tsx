"use client";

import StudentProfileCard from "@/app/components/ui/student-view-ui/student-profile-card";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";

export default function TagComponentTestPage() {
  return (
    <main className="w-full">
        <div className="h-dvh max-w-6xl">
            <StudentProfileHeader></StudentProfileHeader>
            <StudentProfileCard className="h-1/2 bg-action-fresh-green"></StudentProfileCard>
        </div>
    </main>
  );
} 