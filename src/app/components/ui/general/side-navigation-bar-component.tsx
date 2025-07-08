// app/components/ui/general/side-navigation-bar-component.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/actions/auth";

import { ButtonConfig } from "./button-type";
import { TambayanIcon, TambayanTextIcon } from "@/app/components/icons"; // Assuming you want the logo inside

// The Props interface is simpler now
interface Props {
  myButtons: ButtonConfig[];
  selectedButtonId: string;
  onButtonSelect: (id: string) => void;
  isExpanded: boolean; // This is the only prop needed to control the view
}

export default function SideNavBar({
  myButtons,
  selectedButtonId,
  onButtonSelect,
  isExpanded, // We will use this directly
}: Props) {
  const pathname = usePathname(); // Good for setting the 'active' state

  return (
    // Use the isExpanded prop to control the width and padding
    <aside
      className={`sticky top-0 h-screen bg-tint-forest-fern flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? "w-64 p-4" : "w-20 p-2"}`}
    >
      {/* Header section with logo */}
      <div className={`flex items-center mb-8 h-12 ${isExpanded ? "px-2" : "justify-center"}`}>
        <TambayanIcon className="h-10 w-10 flex-shrink-0" />
        {/* Conditionally render the text with a fade effect */}
        {isExpanded && (
            <div className="ml-2 overflow-hidden">
                <TambayanTextIcon className="h-6" />
            </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {myButtons.map((button) => {
            // Check if the current button's href matches the start of the pathname
            // This makes 'newsfeed' active even if the URL is '/organization/org_1/newsfeed'
            const isActive = button.href ? pathname.includes(button.href) : false;

            const buttonContent = (
              <>
                <div className="w-6 h-6 flex-shrink-0 text-white">{button.icon}</div>
                {/* Conditionally render the label based on the isExpanded prop */}
                {isExpanded && (
                  <span className={`ml-4 ${button.className}`}>
                    {button.children}
                  </span>
                )}
              </>
            );

            const buttonClasses = `w-full flex items-center p-3 rounded-lg text-white transition-colors duration-200 ${
              isActive
                ? 'bg-action-forest-green font-semibold'
                : 'hover:bg-action-forest-green/50'
            } ${isExpanded ? '' : 'justify-center'}`; // Center icon when collapsed

            if (button.id === "logout") {
              return (
                <li key={button.id} className="mt-auto pt-4 border-t border-white/20">
                  <form action={signOut} className="w-full">
                    <button type="submit" className={buttonClasses}>
                      {buttonContent}
                    </button>
                  </form>
                </li>
              );
            }

            return (
              <li key={button.id}>
                <Link
                  href={button.href || "#"}
                  onClick={() => onButtonSelect(button.id)}
                  className={buttonClasses}
                >
                  {buttonContent}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}