"use client";
import React from "react";
import UpcomingorgEventComponent from "@/app/components/ui/general/upcomingorg-event-component";

const RegisterIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="11" y="3" width="2" height="18" rx="1" fill="currentColor" />
  </svg>
);

const DeregisterIcon = (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
  </svg>
);

// Added more events to demonstrate scrolling and the grid layout
const baseEvents = [
  {
    id: "event-1",
    title: "Hackathon 2025",
    description: "Compete in a 24-hour hackathon with exciting prizes!",
    date: "July 10, 2025",
  },
  {
    id: "event-2",
    title: "AI & ML Conference",
    description: "Learn from top AI researchers and developers.",
    date: "August 3, 2025",
  },
  {
    id: "event-3",
    title: "Web Dev Bootcamp",
    description: "Master React, Tailwind, and backend tools in 5 days.",
    date: "September 12, 2025",
  },
  {
    id: "event-4",
    title: "Cloud Computing Talk",
    description: "Intro to AWS, Azure, and GCP for students.",
    date: "October 2, 2025",
  },
  {
    id: "event-5",
    title: "Cybersecurity Workshop",
    description: "Hands-on workshop on ethical hacking and network security.",
    date: "November 5, 2025",
  },
  {
    id: "event-6",
    title: "UI/UX Design Sprint",
    description: "Collaborate to design and prototype a new app in 48 hours.",
    date: "December 1, 2025",
  },
];

export default function UpcomingorgEventTest() {
  const [registrations, setRegistrations] = React.useState<boolean[]>(() =>
    baseEvents.map(() => false)
  );

  const events = baseEvents.map((event, index) => {
    return {
      ...event,
      buttonLabel: registrations[index] ? "Deregister" : "Register Now",
      buttonColorClass: registrations[index]
        ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
        : "bg-green-500 text-white hover:bg-green-600",
      buttonIcon: registrations[index] ? DeregisterIcon : RegisterIcon,
      onButtonClick: () => {
        setRegistrations((prev) => {
          const updated = [...prev];
          updated[index] = !updated[index];
          const action = updated[index] ? "Registered" : "Deregistered";
          console.log(`${action}: ${event.title} (id: ${event.id})`);
          return updated;
        });
      },
    };
  });

  return (
    // The wrapper here already has responsive padding, which is good.
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-2 sm:p-4">
      <UpcomingorgEventComponent events={events} />
    </div>
  );
}