"use client";

import { FaBook, FaUser, FaCogs } from "react-icons/fa";
import WikiListComponent from "@/app/components/ui/general/wiki-list-component";
import { useRouter } from "next/navigation";

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
    onClick: () => router.push(`/wiki/${card.id}`),
  }));
  return <WikiListComponent textcolor="text-green-700" cards={cardsWithNavigation} />;
}
