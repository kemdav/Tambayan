// components/views/ProfileView.tsx  <- This is your interactive Client Component

"use client"; // This MUST be here

import StudentProfileCard from "@/app/components/ui/student-view-ui/student-profile-card";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { useEffect, useState } from "react";
import { ProfileViewNavBarContents } from "../../navBars/navBarContents";
import { type StudentProfile } from "@/lib/types/database";
import { createClient } from "@/lib/supabase/client";
import { type Poster } from "@/lib/types/types";

// Define the props that this component will receive
interface ProfileViewProps {
  initialProfile: StudentProfile;
  initialPosts: Poster[];
}

export default function ProfileView({ initialProfile, initialPosts }: ProfileViewProps) {
  console.log("ProfileView received initialPosts:", initialPosts);
  // All your hooks and state management live here!
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [selectedNavId, setSelectedNavId] = useState<string>("post");

  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  const {
    studentid,
    course,
    email,
    yearlevel,
    picture,
    universityid,
    about,
    user_id,
  } = profile;

  const handleProfileUpdate = (updatedProfileData: Partial<StudentProfile>) => {
    setProfile(prevProfile => ({ ...prevProfile, ...updatedProfileData }));
  };


  return (
    <main className="w-full h-full">
      <main className="w-full grid place-items-center items-start">
        <div className="mainContentCard">
          <StudentProfileHeader isEditable={true} initialProfile={profile} onProfileUpdate={handleProfileUpdate}></StudentProfileHeader>
          <StudentProfileCard
            className="h-1/2"
            myButtons={ProfileViewNavBarContents}
            selectedButtonId={selectedNavId}
            onButtonSelect={setSelectedNavId}
            // Use the data from the 'initialProfile' prop
            studentId={studentid.toString()}
            studentCourse={course || "N/A"}
            studentEmail={email || "N/A"}
            studentYear={yearlevel || "N/A"}
            studentJoinDate="September 17, 2004" // You can pass this down too
            studentEventsJoined="6"
            studentTotalOrg="3"
            posts={initialPosts}
          ></StudentProfileCard>
        </div>
      </main>
    </main>
  );
}