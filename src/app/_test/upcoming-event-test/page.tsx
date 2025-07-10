"use client";

import * as React from "react";
import { UpcomingEventComponent } from "@/app/components/ui/general/upcoming-event-component";

const RegisterIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" /><rect x="11" y="3" width="2" height="18" rx="1" fill="currentColor" /></svg>
);
const DeregisterIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" /></svg>
);

export default function UpcomingEventTestPage() {
  const [registered, setRegistered] = React.useState(false);

  return (
    <div className="min-h-screen bg-neutral-mint-white flex flex-col items-center justify-center p-4">
      <UpcomingEventComponent
        orgName="ICPEP"
        avatarSrc={null}
        daysAgo={2}
        eventTitle="Hackathon: AI for Social Good"
        eventDescription={
          "Join our 48-hour hackathon focused on developing AI solutions for social impact. Teams of 2-4 will compete for prizes and mentorship opportunities."
        }
        buttonLabel={registered ? "Deregister" : "Register Now"}
        buttonColorClass={
          registered
            ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
            : "bg-green-500 text-white hover:bg-green-600"
        }
        buttonIcon={registered ? DeregisterIcon : RegisterIcon}
        onButtonClick={() => setRegistered((prev) => !prev)}
      />
    </div>
  );
} 