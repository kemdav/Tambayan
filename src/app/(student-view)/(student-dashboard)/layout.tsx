import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StudentVerticalNavigation, { myButtons } from "./sideNavBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tambayan"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <StudentVerticalNavigation>{children}</StudentVerticalNavigation>
  );
}
