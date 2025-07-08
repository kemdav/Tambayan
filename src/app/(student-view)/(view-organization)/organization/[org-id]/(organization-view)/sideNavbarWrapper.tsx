"use client"
import { AddIcon, AddIcon2, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon, TambayanIcon, WikiIcon } from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import { StepBackIcon } from "lucide-react";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";
import { createOfficialPost, createEvent } from "@/lib/actions/post";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,       // For Back
  Newspaper,       // For Newsfeed
  Library,         // For Wiki
  Shield,          // For Officers
  BadgeCheck,      // For Accreditation
  Megaphone,       // For Broadcasts
} from "lucide-react";
export const myButtons: ButtonConfig[] = [
  {
    id: "back",
    children: "Back",
    href: "/profile",
    variant: "sideNavigation",
    className: "sideNavBarButtonText",
    icon: <ArrowLeft className="size-5" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "newsfeed",
    className: "sideNavBarButtonText",
    icon: <Newspaper className="size-5" />,
  },
  {
    id: "wiki",
    variant: "sideNavigation",
    href: "wiki",
    children: "Wiki",
    className: "sideNavBarButtonText",
    icon: <Library className="size-5" />,
  },
  {
    id: "officers",
    variant: "sideNavigation",
    href: "officers",
    children: "Officers",
    className: "sideNavBarButtonText",
    icon: <Shield className="size-5" />,
  },
  {
    id: "accreditation",
    variant: "sideNavigation",
    href: "accreditation",
    children: "Accreditation",
    className: "sideNavBarButtonText",
    icon: <BadgeCheck className="size-5" />,
  },
  {
    id: "broadcast",
    variant: "sideNavigation",
    href: "broadcast",
    children: "Broadcasts",
    className: "sideNavBarButtonText",
    icon: <Megaphone className="size-5" />,
  },
];
type OrgOption = {
  value: string;
  label: string;
};

const SideBar = ({ isOfficer, onButtonSelect, isExpanded }: {
  isOfficer: boolean,
  onButtonSelect: (id: string) => void,
  isExpanded: boolean
}) => {
  const [selectedNavId, setSelectedNavId] = useState<string>("newsfeed");
  const visibleButtons = myButtons.filter(button => {
    if (button.id === 'officers' || button.id === 'accreditation') {
      return isOfficer;
    }
    return true;
  });
  const handleSelect = (id: string) => {
    setSelectedNavId(id);
    onButtonSelect(id);
  };
  return (
    <SideNavBar
      myButtons={visibleButtons}
      selectedButtonId={selectedNavId}
      onButtonSelect={handleSelect}
      isExpanded={isExpanded}
    />
  );
}

interface Props {
  children: React.ReactNode;
}

export function StudentVerticalNavigation({ children, isOfficer }: { children: React.ReactNode, isOfficer: boolean }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  // --- STATE FOR CREATE MODAL ---
  const [createMode, setCreateMode] = useState<'official' | 'event' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();
  const orgId = params['org-id'] as string;

  // --- FORM STATE ---
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

  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

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
  const isSidebarExpanded = isNavOpen || isDesktop;
  if (!hasMounted) {
    return null; 
  }
  return (
    <>
      {/* The Modal for Creating Posts/Events */}
      {createMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={closeAndResetModal}>
          <div className="w-full max-w-sm md:max-w-2xl bg-white rounded-2xl shadow-lg" onClick={(e) => e.stopPropagation()}>
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
              org={null} onOrgChange={() => { }} orgOptions={[]}
            />
          </div>
        </div>
      )}

      {/* The Main Page Layout */}
      <div className="flex h-screen bg-gray-50">

        {isNavOpen && (<div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsNavOpen(false)}></div>)}

        <div
          className={`
            flex-shrink-0 z-30 bg-white shadow-lg
            transform transition-transform duration-300 ease-in-out
            md:relative md:shadow-none md:translate-x-0
            fixed top-0 left-0 h-full
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <SideBar 
            isOfficer={isOfficer} 
            onButtonSelect={() => setIsNavOpen(false)}
            isExpanded={isSidebarExpanded}
          />
        </div>

        <div className="flex flex-col flex-1 w-0 overflow-y-auto">
          {/* Mobile Header */}
          <div className="p-4 md:hidden">
            <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                  <TambayanIcon className="h-8 w-8" />
              </div>
              <button onClick={() => setIsNavOpen(true)} className="p-2">
                  <NavigationButtonIcon className="h-6 w-6" /> 
              </button>
            </div>
          </div>
          
          <div className="flex-grow flex flex-col items-center p-4 md:p-8">
            {children}
          </div>
        </div>

        {/* The "Create" Buttons for Officers */}
        {isOfficer && (
          <div className="z-20 fixed bottom-0 right-0 sm:mx-10 sm:my-10 flex flex-col gap-3">
            <Button className="flex items-center justify-start gap-2 p-3 bg-green-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => setCreateMode('official')}>
              <AddIcon2 className="size-6" /> New Official Post
            </Button>
            <Button className="flex items-center justify-start gap-2 p-3 bg-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
              onClick={() => setCreateMode('event')}>
              <AddIcon2 className="size-6" /> New Event
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
