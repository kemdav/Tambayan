"use client";

import { useState, useRef, useEffect } from "react";
import { FaBook, FaUser, FaCogs, FaPlus, FaEllipsisV, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CardItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  customRight?: React.ReactNode;
}

export default function WikiListTest() {
  const router = useRouter();
  const [wikiCards, setWikiCards] = useState<CardItem[]>([
    { id: "1", title: "Introduction", icon: <FaBook /> },
    { id: "2", title: "How to Join", icon: <FaUser /> },
    { id: "3", title: "Settings & Tools", icon: <FaCogs /> },
  ]);

  const [showAddButton, setShowAddButton] = useState(false);
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

  const handleAddCard = () => {
    const newId = (wikiCards.length + 1).toString();
    const newCard: CardItem = {
      id: newId,
      title: `New Wiki ${newId}`,
      icon: <FaPlus />,
    };
    setWikiCards([...wikiCards, newCard]);
  };

  return (
    <div className="flex flex-col items-center mt-10 min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-md shadow-md p-6 flex flex-col relative z-10">
        <div className="flex items-center mb-4">
          <h1 className="text-2xl font-bold text-left flex-1 text-green-700">Wiki</h1>
          <button
            className="ml-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => setShowAddButton(prev => !prev)}
          >
            {showAddButton ? "Hide Add Wiki" : "Show Add Wiki"}
          </button>
        </div>

        {showAddButton && (
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
                onClick={() => router.push(`/wiki/${card.id}`)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    router.push(`/wiki/${card.id}`);
                  }
                }}
              >
                {card.icon && (
                  <span className="mr-3 text-green-600 text-lg">{card.icon}</span>
                )}
                <span className="text-base font-medium text-green-800 truncate">
                  {card.title}
                </span>
              </div>

              <div className="ml-auto relative" ref={menuRef}>
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

                {openMenuId === card.id && (
                  <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded shadow z-50 min-w-[120px]">
                    <button
                      type="button"
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-800"
                      onClick={e => {
                        e.stopPropagation();
                        setWikiCards(wikiCards.filter(c => c.id !== card.id));
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
