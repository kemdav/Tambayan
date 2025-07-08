"use client"
import { AddIcon, AddIcon2, LogOutIcon, NavigationButtonIcon, NewsfeedIcon, StudentProfileIcon, SubscribedOrgIcon } from "@/app/components/icons";
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
import {Filter} from 'bad-words'; 
import { HamburgerIcon } from "lucide-react";
import { signOut } from "@/lib/actions/auth";
const profanityFilter = new Filter();
import {
  UserCircle,      // For Student Profile
  Users,           // For Joined Organizations
  UserPlus,        // For Join Organization
  Newspaper,       // For Newsfeed
  Star,            // For Subscribed Organizations
  Megaphone,       // For Broadcasts
  Search,          // For Search Posts
  UserSearch,      // For Search Profile
  LogOut,          // For Logout
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
    id: "logout",
    variant: "sideNavigation",
    children: "Logout",
    className: "sideNavBarButtonText",
    icon: <LogOut className="size-5" />,
  },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [postType, setPostType] = useState<'default' | 'official' | 'event'>("default");
  const [org, setOrg] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const [registrationStart, setRegistrationStart] = useState<Date | undefined>();
  const [registrationEnd, setRegistrationEnd] = useState<Date | undefined>();
  const [submitted, setSubmitted] = useState<any>(null);
  const [selected, setSelected] = useState("profile");
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Tag and photo state
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchOrgOptions = async () => {
      const supabase = createClient();

      // --- THIS IS THE NEW, SIMPLIFIED LOGIC ---
      // Make a single call to our new RPC function.
      const { data, error } = await supabase.rpc('get_user_subscribed_org_options');

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
  const handlePost = async () => {
    // Basic validation on the client-side
    if (!org) {
      alert("Please select an organization.");
      return;
    }
    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }
    if (profanityFilter.isProfane(title) || profanityFilter.isProfane(content)) {
        alert("Your post contains inappropriate language. Please revise it.");
        return; // Stop the submission
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('orgId', org);
    formData.append('title', title);
    formData.append('content', content);
    if (photoFile) {
      formData.append('photoFile', photoFile);
    }

    // 2. Call the server action
    const result = await createPost(formData);

    setIsSubmitting(false); // Re-enable the button

    // 3. Handle the result
    if (result.error) {
      alert(`Error: ${result.error}`); // Show an error message
    } else {
      // Success!
      alert(result.success);
      closeAndResetModal(); // Call a helper function to clean up
      router.refresh(); // THIS IS THE MAGIC! It refetches server data and updates the UI.
    }
  };
  const closeAndResetModal = () => {
    setCreatePostOpen(false);
    setPostType("default");
    setOrg(null);
    setTitle("");
    setContent("");
    setPhotoFile(null);
    setEventLocation("");
    setEventDate(undefined);
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
              org={org}
              onOrgChange={setOrg}
              title={title}
              orgOptions={orgOptions}
              onTitleChange={setTitle}
              content={content}
              isSubmitting={isSubmitting}
              onContentChange={setContent}
              onPost={handlePost}
              eventLocation={eventLocation}
              onEventLocationChange={setEventLocation}
              eventDate={eventDate}
              onEventDateChange={setEventDate}
              postButtonText={isSubmitting ? "Posting..." : "Post"}
              photoFile={photoFile}
              onPhotoChange={handlePhotoChange}
            />
          </div>
        </div>
      )}

      <div className="relative min-h-screen md:flex">
            <div className="p-4 md:hidden">
              <div className="flex justify-between items-center bg-tint-forest-fern text-white p-4 rounded-[20px] shadow-lg">
                <div className="font-bold text-xl">Student</div>
                <button onClick={() => setIsNavOpen(true)} className="cursor-pointer">
                  <NavigationButtonIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
      
            {isNavOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                onClick={() => setIsNavOpen(false)}
              ></div>
            )}
      
            <div
              className={`
                fixed top-0 left-0 h-full z-30
                transform transition-transform duration-300 ease-in-out
                ${isNavOpen ? "translate-x-0" : "-translate-x-full"}
                
                md:relative md:translate-x-0 md:z-auto md:h-auto
              `}
            >
              <SideNavBar
                myButtons={myButtons}
                selectedButtonId={selectedNavId}
                onButtonSelect={setSelectedNavId}
                isOpen={isNavOpen}
                onToggle={() => setIsNavOpen(!isNavOpen)}
              />
            </div>
      
            <main className="flex-1 bg-neutral-mint-white p-4">{children}</main>
          </div>
    </>
  );
}
