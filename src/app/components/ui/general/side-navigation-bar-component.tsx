// In /app/components/ui/general/side-navigation-bar-component.tsx

"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "@/lib/actions/auth";

import { ButtonConfig } from "./button-type";
import { Button } from "./button";
import { TambayanIcon, TambayanTextIcon, NavigationButtonIcon } from "@/app/components/icons";

interface Props {
  myButtons: ButtonConfig[];
  selectedButtonId: string;
  onButtonSelect: (id: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function SideNavBar({
  myButtons,
  selectedButtonId,
  onButtonSelect,
  isOpen,
  onToggle,
}: Props) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);


  useEffect(() => {
    setHasMounted(true);
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!hasMounted) {
    return null; // Or you could return a loading skeleton here
  }

  const isExpanded = isMobile ? isOpen : isNavOpen;
  const handleToggle = isMobile && onToggle ? onToggle : () => setIsNavOpen(!isNavOpen);

  return (
    <aside
      className={`sticky top-0 h-screen bg-tint-forest-fern flex flex-col transition-all duration-300 ease-in-out overflow-x-hidden ${isExpanded ? "w-72 p-4" : "w-20 p-2"
        }`}
    >
      <div
        className={`flex items-center mb-8 ${isExpanded ? "justify-between" : "justify-center"}`}
      >
        {isExpanded && <TambayanTextIcon className="h-8" />}
        <Button
          className="bg-transparent hover:bg-white/10 p-2 rounded-full"
          onClick={handleToggle}
        >
          <NavigationButtonIcon className="size-6 text-white" />
        </Button>
      </div>

      <nav className="flex flex-col flex-1">
        <ul className="space-y-2">
          {myButtons.map((button) => {
            const isActive = pathname === button.href;

            const buttonContent = (
              <>
                <div className="w-6 h-6 flex-shrink-0">{button.icon}</div>
                {isExpanded && (
                  <span className={`ml-4 transition-opacity duration-200 ${button.className} ${isExpanded ? "opacity-100 delay-150" : "opacity-0"}`}>

                    {button.children}
                  </span>
                )}
              </>
            );

            // --- THE KEY FIX IS HERE ---
            const buttonClasses = `w-full flex items-center p-3 rounded-lg text-white transition-colors duration-200 ${isActive ? 'bg-forest-green-dark font-semibold' : 'hover:bg-forest-green-dark/50'
              } ${isExpanded ? '' : 'justify-center'}`; // Add justify-center when collapsed

            if (button.id === "logout") {
              return (
                <li key={button.id}>
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
                <Link href={button.href || "#"} onClick={() => onButtonSelect(button.id)}>
                  <div className={buttonClasses}>
                    {buttonContent}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}