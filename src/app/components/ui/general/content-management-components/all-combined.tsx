"use client";

import { Button } from "@/app/components/ui/general/button";
import RecentPostComponent from "@/app/components/ui/general/content-management-components/recent-post";
import UpcomingEventComponent from "./upcoming-events";
import OrgWikiComponent from "./organization-wiki";
import { Plus } from "lucide-react";

export default function CombinedComponents() {
  const recentPosts = [
    {
      title: "Welcome New Members!",
      date: "2 days ago",
      content:
        "A warm welcome to all our new members who joined this semester...",
    },
  ];

  const upcomingEvent = [
    {
      title: "Annual General Meeting",
      date: "June 15, 2025 | 3:00 PM",
      location: "Student Center",
    },
  ];

  const wikiOrganization = [
    {
      title: "About Our Organization",
      date: "June 15, 2025",
    },
  ];

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-[1120px] h-full max-h-[700px] bg-action-moss-green border rounded-[10px] p-4 flex flex-col space-y-4 overflow-hidden">
        <div className="flex space-x-4">
          <Button>
            <Plus className="w-5 h-5" />
            New Post
          </Button>
          <Button>
            <Plus className="w-5 h-5" />
            New Event
          </Button>
          <Button>Wiki Editor</Button>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 flex-1 overflow-auto">
          <RecentPostComponent
            contents={recentPosts}
            onClickCreateNew={() => console.log("Create Entered Recent")}
            onClickViewAll={() => console.log("View All Entered Recent")}
          />
          <UpcomingEventComponent
            contents={upcomingEvent}
            onClickCreateNew={() => console.log("Create Entered")}
            onClickViewAll={() => console.log("View All Entered")}
          />
          <OrgWikiComponent
            contents={wikiOrganization}
            onClickEdit={() => console.log("Edit Wiki Entered")}
          />
        </div>
      </div>
    </div>
  );
}
