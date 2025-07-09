"use client";
import {
  AddIcon,
  AddIcon2,
  LogOutIcon,
  NavigationButtonIcon,
  NewsfeedIcon,
  StudentProfileIcon,
  SubscribedOrgIcon,
  TambayanIcon,
  TambayanTextIcon,
} from "@/app/components/icons";
import { Button } from "@/app/components/ui/general/button";
import { ButtonConfig } from "@/app/components/ui/general/button-type";
import { CreatePostComponent } from "@/app/components/ui/general/create-post-component";
import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import SearchBar from "@/app/components/ui/student-view-ui/search-bar";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { createPost } from "@/lib/actions/post";
import { redirect, useRouter } from "next/navigation";
import { ShowcaseCardProps } from "@/app/components/ui/general/showcase-card-component";
import { Filter } from "bad-words";
import { HamburgerIcon, Navigation2Icon } from "lucide-react";
import { signOut } from "@/lib/actions/auth";

const profanityFilter = new Filter();
import {
  UserCircle, // For Student Profile
  Users, // For Joined Organizations
  UserPlus, // For Join Organization
  Newspaper, // For Newsfeed
  Star, // For Subscribed Organizations
  Megaphone, // For Broadcasts
  Search, // For Search Posts
  UserSearch, // For Search Profile
  LogOut,
  KeyRound, // For Logout
} from "lucide-react";

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
    className: "sideNavBarButtonText",
    icon: <UserCircle className="size-5" />,
  },
  {
    id: "searchProfile",
    children: "Search Profile",
    href: "/search",
    variant: "sideNavigation",
    className: "sideNavBarButtonText",
    icon: <UserSearch className="size-5" />,
  },
  {
    id: "searchPosts",
    children: "Search Posts",
    href: "/search-posts",
    variant: "sideNavigation",
    className: "sideNavBarButtonText",
    icon: <Search className="size-5" />,
  },
  {
    id: "newsfeed",
    children: "Newsfeed",
    variant: "sideNavigation",
    href: "/newsfeed",
    className: "sideNavBarButtonText",
    icon: <Newspaper className="size-5" />,
  },
  {
    id: "sub-org",
    children: "Subscribed Organizations",
    variant: "sideNavigation",
    href: "/subscribed",
    className: "sideNavBarButtonText",
    icon: <Star className="size-5" />,
  },
  {
    id: "joined-org",
    variant: "sideNavigation",
    href: "/joined",
    children: "Joined Organization",
    className: "sideNavBarButtonText",
    icon: <Users className="size-5" />,
  },
  {
    id: "join-org",
    variant: "sideNavigation",
    href: "/join",
    children: "Join Organization",
    className: "sideNavBarButtonText",
    icon: <UserPlus className="size-5" />,
  },
  {
    id: "broadcast",
    variant: "sideNavigation",
    href: "/broadcast",
    children: "Broadcasts",
    className: "sideNavBarButtonText",
    icon: <Megaphone className="size-5" />,
  },
  {
    id: "change-password",
    variant: "sideNavigation",
    href: "/change-password",
    children: "Change Password",
    className: "sideNavBarButtonText",
    icon: <KeyRound className="size-5" />,
  },
  {
    id: "logout",
    variant: "sideNavigation",
    children: "Logout",
    className: "sideNavBarButtonText",
    icon: <LogOut className="size-5" />,
  },
];

const SideBar = ({
  onButtonSelect,
  isExpanded,
}: {
  onButtonSelect: (id: string) => void;
  isExpanded: boolean;
}) => {
  const [selectedNavId, setSelectedNavId] = useState<string>("profile");

  const handleSelect = (id: string) => {
    setSelectedNavId(id);
    onButtonSelect(id);
  };

  return (
    <SideNavBar
      myButtons={myButtons}
      selectedButtonId={selectedNavId}
      onButtonSelect={handleSelect}
      // Pass the expanded state down to the final component
      isExpanded={isExpanded}
    />
  );
};

export default function StudentVerticalNavigation({ children }: Props) {
  // --- STATE FOR THE CREATE POST MODAL ---
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [orgOptions, setOrgOptions] = useState<OrgOption[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  // State for the form fields
  const [org, setOrg] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const handleNavSelect = (id: string) => {
    // When a nav button is clicked, close the mobile menu
    setIsNavOpen(false);
  };
  // Fetch the organizations the student is SUBSCRIBED to
  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768); // 768px is the 'md' breakpoint
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const fetchOrgOptions = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.rpc(
        "get_user_subscribed_org_options"
      );
      if (error) {
        console.error("Error fetching subscribed organization options:", error);
      } else if (data) {
        setOrgOptions(data);
      }
    };
    fetchOrgOptions();
  }, []);

  const closeAndResetModal = () => {
    setCreatePostOpen(false);
    setOrg(null);
    setTitle("");
    setContent("");
    setPhotoFile(null);
  };

  const handlePost = async () => {
    if (!org) {
      alert("Please select an organization to post to.");
      return;
    }
    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    if (
      profanityFilter.isProfane(title) ||
      profanityFilter.isProfane(content)
    ) {
      alert(
        "Your post contains inappropriate language. Please remove it and try again."
      );
      return; // Stop the submission
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("orgId", org);
    formData.append("title", title);
    formData.append("content", content);
    if (photoFile) {
      formData.append("photoFile", photoFile);
    }

    const result = await createPost(formData); // This calls the community post action
    setIsSubmitting(false);

    if (result.error) {
      alert(`Error: ${result.error}`);
    } else if (result.success) {
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
      {/* The Modal for Creating a Community Post */}
      {isCreatePostOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeAndResetModal}
        >
          <div
            className="w-full max-w-sm md:max-w-2xl bg-white rounded-2xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CreatePostComponent
              className=""
              postType="default" // This is always a default/community post
              isOfficialMode={false} // This is NOT an official post
              org={org}
              onOrgChange={setOrg}
              orgOptions={orgOptions}
              title={title}
              onTitleChange={setTitle}
              content={content}
              onContentChange={setContent}
              photoFile={photoFile}
              onPhotoChange={setPhotoFile}
              onPost={handlePost}
              isSubmitting={isSubmitting}
              // Pass dummy props for event fields since they aren't used here
              eventLocation=""
              onEventLocationChange={() => {}}
              eventDate={undefined}
              onEventDateChange={() => {}}
            />
          </div>
        </div>
      )}

      {/* The Main Page Layout */}
      <div className="flex h-screen bg-gray-50">
        {isNavOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setIsNavOpen(false)}
          ></div>
        )}

        <div
          className={`
            flex-shrink-0 z-30 bg-white shadow-lg
            transform transition-transform duration-300 ease-in-out
            
            md:relative md:shadow-none md:translate-x-0
            
            fixed top-0 left-0 h-full
            ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* This is the actual sidebar content */}
          <SideBar
            onButtonSelect={() => setIsNavOpen(false)}
            isExpanded={isSidebarExpanded}
          />
        </div>
        <div className="flex flex-col flex-1 w-0 overflow-y-auto">
          <div className="p-4 md:hidden">
            <div className="flex justify-between items-center bg-white text-gray-800 p-2 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <TambayanIcon className="h-8 w-8" />
                <TambayanTextIcon className="h-6" />
              </div>
              <button onClick={() => setIsNavOpen(true)} className="p-2">
                {/* Using a consistent icon */}
                <NavigationButtonIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="flex-grow flex flex-col items-center p-4 md:p-8">
            {children}
          </div>
        </div>

        {/* The Floating Action Button (FAB) */}
        <div className="z-20 fixed bottom-0 right-0 sm:mx-10 sm:my-10 opacity-50 md:opacity-100">
          <Button
            className="size-15 sm:size-20 bg-black/0 hover:bg-black/0 hover:scale-110 transition delay-10 duration-300 ease-in-out hover:-translate-y-1"
            onClick={() => setCreatePostOpen(true)}
          >
            <AddIcon2 className="size-15 sm:size-20 text-action-moss-green" />
          </Button>
        </div>
      </div>
    </>
  );
}
