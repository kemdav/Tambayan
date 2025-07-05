"use client"
import { AddIcon, AddIcon2, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import SearchBar from "@/app/components/ui/student-view-ui/search-bar";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { ShowcaseCardProps } from "@/app/components/ui/general/showcase-card-component";

interface Props {
  children: React.ReactNode;
}

type OrgOption = {
  value: string;
  label: string;
};

export const myButtons: ButtonConfig[] = [
  {
    id: "profile",
    children: "Student Profile",
    href: "/profile",
    variant: "sideNavigation",
    className:
      "sideNavBarButtonText",
    icon: <StudentProfileIcon className="size-10" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "/newsfeed",
    className:
      "sideNavBarButtonText",
    icon: <NewsfeedIcon className="size-10" />,
  },
  {
    id: "sub-org",
    children: "Subscribed Organizations",
    variant: "sideNavigation",
    href: "/subscribed",
    className:
      "sideNavBarButtonText",
    icon: <SubscribedOrgIcon className="size-10" />,
  },
  {
    id: "join-org",
    variant: "sideNavigation",
    href: "/join",
    children: "Join Organization",
    className: "sideNavBarButtonText",
    icon: <AddIcon className="size-10" />,
  },
  {
    id: "logout",
    variant: "sideNavigation",
    href: "/login",
    children: "Logout",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  }
];

const SideBar = () => {
  const [selectedNavId, setSelectedNavId] = useState<string>("profile");
  return (<div className="">
    <SideNavBar myButtons={myButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>
  </div>);
}

export default function StudentVerticalNavigation({ children }: Props) {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [selectedNavId, setSelectedNavId] = useState<string>("profile");
  const [orgOptions, setOrgOptions] = useState<OrgOption[]>([])

  const [postType, setPostType] = useState("default");
  const [org, setOrg] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [registrationStart, setRegistrationStart] = useState<Date | undefined>();
  const [registrationEnd, setRegistrationEnd] = useState<Date | undefined>();
  const [submitted, setSubmitted] = useState<any>(null);

  // Tag and photo state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  useEffect(() => {
    const fetchOrgOptions = async () => {
      const supabase = createClient();

      // --- THIS IS THE NEW, SIMPLIFIED LOGIC ---
      // Make a single call to our new RPC function.
      const { data, error } = await supabase.rpc('get_user_org_options');

      if (error) {
        console.error("Error fetching organization options:", error);
        return;
      }

      // The `data` is already in the perfect [{ value, label }] format.
      // No .map() or .filter() needed!
      if (data) {
        setOrgOptions(data);
      }
    };

    fetchOrgOptions();
  }, []);
  // Tag handlers
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
    }
    setTagInput("");
  };
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // Photo handler
  const handlePhotoChange = (file: File | null) => {
    setPhotoFile(file);
  };
   const handlePost = () => {
    // ... your post handling logic
  };

  return (
    <>
      {isCreatePostOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setCreatePostOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <CreatePostComponent
              className="max-w-2xl min-w-1xl md:w-2xl"
              postType={postType}
              onPostTypeChange={setPostType}
              org={org}
              onOrgChange={setOrg}
              title={title}
              orgOptions={orgOptions}
              onTitleChange={setTitle}
              content={content}
              onContentChange={setContent}
              onPost={handlePost}
              eventLocation={eventLocation}
              onEventLocationChange={setEventLocation}
              eventDate={eventDate}
              onEventDateChange={setEventDate}
              registrationStart={registrationStart}
              onRegistrationStartChange={setRegistrationStart}
              registrationEnd={registrationEnd}
              onRegistrationEndChange={setRegistrationEnd}
              tags={tags}
              tagInput={tagInput}
              onTagInputChange={setTagInput}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              photoFile={photoFile}
              onPhotoChange={handlePhotoChange}
            />
          </div>
        </div>
      )}

      <div className="relative flex h-dvh">
        <div className="z-20 fixed overflow-y-auto">
          <SideBar></SideBar>
        </div>
        <div className="flex-grow flex flex-col items-center pt-5">
          <SearchBar className="w-full max-w-4xl"></SearchBar>
          {children}
        </div>
        <div className="z-20 fixed bottom-0 right-0 sm:mx-10 sm:my-10 opacity-50 md:opacity-100">
          <Button className="size-15 sm:size-20 bg-black/0 hover:bg-black/0 hover:scale-110 transition delay-10 duration-300 ease-in-out hover:-translate-y-1"
            onClick={() => setCreatePostOpen(true)}><AddIcon2 className="size-15 sm:size-20 text-action-moss-green"></AddIcon2></Button>
        </div>

      </div>
    </>
  );
}
