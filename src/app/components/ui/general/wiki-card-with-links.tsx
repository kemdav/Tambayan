"use client";

import { useState, useRef, useEffect } from "react";
import { FaBook, FaUser, FaCogs, FaPlus, FaEllipsisV, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { createWikiSection, deleteWikiSection } from "@/lib/actions/wiki";

interface CardItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  customRight?: React.ReactNode;
}

interface WikiCardWithLinksProps {
  initialWikiSections: WikiSectionData[]; // <-- Accept initial data
  orgId: string; // <-- Need this to create/delete
  hasPermission?: boolean;
}

interface WikiSectionData {
  id: string;
  title: string;
}

export default function WikiCardWithLinks({ initialWikiSections, orgId, hasPermission = false }: WikiCardWithLinksProps) {
  const router = useRouter();
  const [wikiCards, setWikiCards] = useState(initialWikiSections);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Close menu if clicked outside
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

 const handleAddCard = async () => {
    const title = prompt("Enter title for new section:");
    if (!title) return;
    // Call the server action
    const result = await createWikiSection(orgId, title, "Default content.");
    if (result.error) alert(result.error);
    // Path revalidation will refresh the data on the page
  };

   const handleDeleteCard = async (wikiId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    // Call the server action
    const result = await deleteWikiSection(Number(wikiId), orgId);
    if (result.error) alert(result.error);
    // Path revalidation will refresh
  }

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-md shadow-md p-6 flex flex-col relative z-10">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-left flex-1 text-green-700">Wiki</h1>
        </div>

        {hasPermission && (
          <button
            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
            onClick={handleAddCard}
          >
            <FaPlus className="mr-2" /> Add New Wiki
          </button>
        )}

        <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-4 pr-1">
          {wikiCards.map(card => (
            <div
              key={card.id}
              className="w-full h-[59px] bg-green-50 border border-green-300 rounded-md flex items-center px-6 text-left hover:bg-green-100 transition duration-150 ease-in-out cursor-pointer active:scale-95 relative"
            >
              <div
                className="flex items-center flex-1 min-w-0"
                role="button"
                tabIndex={0}
                onClick={() => router.push(`/organization/${orgId}/wiki/${card.id}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/organization/${orgId}/wiki/${card.id}`);
                  }
                }}
              >
                <span className="text-base font-medium text-green-800 truncate">
                  {card.title}
                </span>
              </div>

              <div className="ml-auto relative" ref={menuRef}>
                {hasPermission && (
                  <button
                    type="button"
                    className="p-2 text-green-600 hover:bg-green-100 rounded-full z-30"
                    onClick={e => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === card.id ? null : card.id);
                    }}
                  >
                    <FaEllipsisV />
                  </button>
                )}

                {hasPermission && openMenuId === card.id && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded shadow z-50 min-w-[120px]">
                    <button
                      type="button"
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800"
                      onClick={e => {
                        e.stopPropagation();
                        handleDeleteCard(card.id)
                        setOpenMenuId(null);
                      }}
                    >
                      <FaTrash className="inline mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
