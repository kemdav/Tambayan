"use client";

import StudentJoinedComponent, {
  EventCard,
} from "@/app/components/ui/general/student-joined-component";

const events: EventCard[] = [
  {
    url: "https://example.com/event1",
    id: 1,
    org: "ICPEP",
    date: "2 days ago",
    title: "Hackathon: AI for Social Good",
    description:
      "Join our 48-hour hackathon focused on developing AI solutions for social impact. Teams of 2–4 will compete for prizes and mentorship opportunities.",
  },
  {
    url: "https://example.com/event2",
    id: 2,
    org: "ICPEP",
    date: "2 days ago",
    title: "AI & Data Ethics Bootcamp",
    description:
      "A workshop exploring the responsibilities of developers and researchers building machine learning tools.",
  },
  {
    url: "https://example.com/event3",
    id: 3,
    org: "ICPEP",
    date: "Yesterday",
    title: "Women in Tech Panel",
    description:
      "Hear from women leaders in tech about their journeys and how to make the industry more inclusive.",
  },
];

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <StudentJoinedComponent events={events} />
    </main>
  );
}
