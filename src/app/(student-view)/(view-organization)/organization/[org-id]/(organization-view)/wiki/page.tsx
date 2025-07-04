"use client";

import { FaBook, FaUser, FaCogs } from "react-icons/fa";
import WikiListComponent from "@/app/components/ui/general/wiki-list-component";
import { useRouter } from "next/navigation";
import StudentProfileHeader from "@/app/components/ui/student-view-ui/student-profile-header";

const wikiData = [
  {
    id: "1",
    title: "Introduction",
    icon: <FaBook />,
  },
  {
    id: "2",
    title: "How to Join",
    icon: <FaUser />,
  },
  {
    id: "3",
    title: "Settings & Tools",
    icon: <FaCogs />,
  },
];

export default function WikiListTest() {
  const router = useRouter();
  const cardsWithNavigation = wikiData.map(card => ({
    ...card,
    onClick: () => router.push(`wiki/${card.id}`),
  }));
  return (
  <div className="w-full grid place-items-center items-start mt-10 md:mt-0">
      <div className="h-auto w-full max-w-3xl shadow-lg/100 p-4">
      <StudentProfileHeader isEditable={true} name="ICPEP"></StudentProfileHeader>
          <WikiListComponent textcolor="text-green-700" cards={cardsWithNavigation} />
      </div>
  </div>);
}