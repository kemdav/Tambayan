"use client"
import { AddIcon, AddIcon2, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon, WikiIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { StepBackIcon } from "lucide-react";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";
import { createOfficialPost, createEvent } from "@/lib/actions/post";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const myButtons: ButtonConfig[] = [
  {
    id: "back",
    children: "Back",
    href: "/profile",
    variant: "sideNavigation",
    className:
      "sideNavBarButtonText",
    icon: <StepBackIcon className="size-10" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "newsfeed",
    className:
      "sideNavBarButtonText",
    icon: <NewsfeedIcon className="size-10" />,
  },
  {
    id: "wiki",
    variant: "sideNavigation",
    href: "wiki",
    children: "Wiki",
    className: "sideNavBarButtonText",
    icon: <WikiIcon className="size-10" />,
  },
  {
    id: "officers",
    variant: "sideNavigation",
    href: "officers",
    children: "Officers",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  },
  {
    id: "accreditation",
    variant: "sideNavigation",
    href: "accreditation",
    children: "Accreditation",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  },
   {
    id: "broadcast",
    variant: "sideNavigation",
    href: "broadcast",
    children: "Broadcasts",
    className: "sideNavBarButtonText",
    icon: <LogOutIcon className="size-10" />,
  }
];

type OrgOption = {
  value: string;
  label: string;
};

const SideBar = ({ isOfficer }: { isOfficer: boolean }) => {
  const [selectedNavId, setSelectedNavId] = useState<string>("newsfeed");
  const visibleButtons = myButtons.filter(button => {
    if (button.id === 'officers' || button.id === 'settings') {
      return isOfficer;
    }
    return true;
  });
  console.log("VISIBLE BUTTONS", visibleButtons);
  console.log("PERMISSION", isOfficer);
  return (<div className="">
    <SideNavBar myButtons={visibleButtons} selectedButtonId={selectedNavId} onButtonSelect={setSelectedNavId}></SideNavBar>
  </div>);
}

interface Props {
  children: React.ReactNode;
}

export function StudentVerticalNavigation({ children, isOfficer }: { children: React.ReactNode, isOfficer: boolean }) {
  const [createMode, setCreateMode] = useState<'official' | 'event' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const orgId = params['org-id'] as string;

    const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>();
   const closeAndResetModal = () => {
    setCreateMode(null);
    setTitle("");
    setContent("");
    setPhotoFile(null);
    setEventLocation("");
    setEventDate(undefined);
  };

   const handleSubmit = async () => {
    if (!orgId) return;

    if (createMode === 'event') {
      if (!title.trim()) return alert("Event Title cannot be empty.");
      if (!eventDate) return alert("Please select a date and time for the event.");
    }
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('orgId', orgId);
    formData.append('title', title);
    formData.append('content', content);
    if (photoFile) formData.append('photoFile', photoFile);

    let result;
    if (createMode === 'event') {
      formData.append('location', eventLocation);
      // Add a check here to satisfy TypeScript.
      // We already know from the validation above that eventDate will not be undefined here.
      if (eventDate) {
        formData.append('date', eventDate.toISOString());
      }
      result = await createEvent(formData);
    } else {
      result = await createOfficialPost(formData);
    }
    
    setIsSubmitting(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else {
      alert(result.success);
      closeAndResetModal();
      router.refresh();
    }
  };
  return (
    <>
      {/* The Modal for Creating Posts/Events */}
      {createMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={closeAndResetModal}>
          <div onClick={(e) => e.stopPropagation()}>
            <CreatePostComponent
              className="max-w-2xl"
              postType={createMode} // 'official' or 'event'
              isOfficialMode={true} // Tells the component to hide the org selector
              onPost={handleSubmit}
              isSubmitting={isSubmitting}
              // Pass state and handlers for controlled components
              title={title}
              onTitleChange={setTitle}
              content={content}
              onContentChange={setContent}
              photoFile={photoFile}
              onPhotoChange={setPhotoFile}
              eventLocation={eventLocation}
              onEventLocationChange={setEventLocation}
              eventDate={eventDate}
              onEventDateChange={setEventDate}
              // Not needed for official posts
              org={null} onOrgChange={()=>{}} orgOptions={[]}
            />
          </div>
        </div>
      )}

      {/* The Main Page Layout */}
      <div className="relative flex h-dvh">
        <div className="z-20 fixed">
          <SideBar isOfficer={isOfficer} />
        </div>
        <div className="grow flex">
          {children}
        </div>

        {/* The "Create" Buttons for Officers */}
        {isOfficer && (
          <div className="z-20 fixed bottom-0 right-0 sm:mx-10 sm:my-10 flex flex-col gap-3">
            <Button className="flex items-center justify-start gap-2 p-3 bg-green-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => setCreateMode('official')}>
              <AddIcon2 className="size-6"/> New Official Post
            </Button>
            <Button className="flex items-center justify-start gap-2 p-3 bg-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => setCreateMode('event')}>
              <AddIcon2 className="size-6"/> New Event
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
