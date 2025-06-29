"use client";

import React from "react";

interface CardItem {
  id: string;
  title: string;
  icon?: React.ReactNode;
  onClick?: () => void; // optional onClick per card
}

interface WikiListProps {
  textcolor: string;
  cards: CardItem[];
}

export default function WikiListComponent({ textcolor, cards }: WikiListProps) {
  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-5xl h-[450px] bg-white border border-gray-300 rounded-md shadow-md p-6 flex flex-col">
        {/* Header */}
        <h1 className={`text-2xl font-bold text-left mb-2 ${textcolor}`}>
          Wiki
        </h1>
        <hr className="border-t border-gray-300 mb-4" />

        {/* Scrollable list area */}
        <div
          className="flex-1 overflow-y-auto space-y-4 pr-1"
          style={{ overflowX: "hidden" }} // hide horizontal scrollbar
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={card.onClick} // assign onClick from prop if provided
              className="w-full h-[59px] bg-green-50 border border-green-300 rounded-md flex items-center px-6 text-left
                hover:bg-green-100 transition duration-150 ease-in-out cursor-pointer
                active:scale-95 active:transition-transform active:duration-75"
              type="button"
            >
              {card.icon && (
                <span className="mr-3 text-green-600 text-lg">{card.icon}</span>
              )}
              <span className="text-base font-medium text-green-800">
                {card.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
