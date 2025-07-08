// components/views/ProfileView.tsx  <- This is your interactive Client Component

"use client"; // This MUST be here

import StudentProfileCard from "@/app/components/ui/student-view-ui/student-profile-card";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";
import { useEffect, useState } from "react";
import { ProfileViewNavBarContents } from "../../navBars/navBarContents";
import { type StudentProfile } from "@/lib/types/database";
import { createClient } from "@/lib/supabase/client";
import { type Poster } from "@/lib/types/types";
import { StudentComment } from '@/lib/actions/comment';

type StudentStats = {
  organizations_joined_count: number;
  events_joined_count: number;
} | null;
// Define the props that this component will receive
interface ProfileViewProps {
  initialProfile: StudentProfile;
  initialPosts: Poster[];
  currentUserID: string;
  initialComments: StudentComment[];
   studentStats: StudentStats;
  isOwnProfile: boolean;
}

export default function ProfileView({ initialProfile, initialPosts, currentUserID, initialComments,  isOwnProfile, studentStats }: ProfileViewProps) {
  // console.log("ProfileView received initialPosts:", initialPosts);
  //   console.log("ProfileView received currentUserID:", currentUserID);
  //   console.log("COMMENT PAGE COMMENT 2=", initialComments);


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
    // We should only allow updates if it's our own profile
    if (!isOwnProfile) return;
    setProfile(prevProfile => ({ ...prevProfile, ...updatedProfileData }));
  };


  return (
    <main className="w-full h-full">
      <main className="w-full grid place-items-center items-start">
        <div className="mainContentCard">
          <StudentProfileHeader isEditable={isOwnProfile} initialProfile={profile} onProfileUpdate={handleProfileUpdate} name={""}></StudentProfileHeader>
          <StudentProfileCard
            className="h-1/2"
            myButtons={ProfileViewNavBarContents}
            selectedButtonId={selectedNavId}
            onButtonSelect={setSelectedNavId}
            currentUserID={currentUserID}
            isOwnProfile={isOwnProfile}
            posts={initialPosts}
            initialComments={initialComments}
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
            studentStats={studentStats} 
          />
        </div>
      </main>
    </main>
  );
}