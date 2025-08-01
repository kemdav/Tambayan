import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "../components/ui/auth-page-ui/nav-bar-auth";
import { AuthBackgroundWave } from "../components/icons/AuthBackgroundWave";
import { AuthBackgroundHexagon } from "../components/icons/AuthBackgroundHexagon";

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
    <div className="flex flex-col min-h-screen">
      <header className="">
        <NavBar></NavBar>
      </header>
      <main className="relative flex-1 flex lg:items-center justify-center overflow-hidden">
        <div className="absolute top-0 z-0">
          <AuthBackgroundHexagon className="h-auto w-300 -translate-x-8 -translate-y-4" />
        </div>
        <div className="absolute bottom-0 left-0 w-full z-10">
          <AuthBackgroundWave className="h-auto w-full" />
        </div>
        <div className="lg:flex-1 lg:flex lg:items-center lg:justify-center relative z-20">
          {children}
        </div>
      </main>
    </div>
  );
}
