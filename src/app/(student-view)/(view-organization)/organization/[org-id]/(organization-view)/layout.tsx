import SideNavBar from "@/app/components/ui/general/side-navigation-bar-component";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {StudentVerticalNavigation} from "./sideNavbarWrapper";
import { getUserOrgRole } from "@/lib/actions/permissions";

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


interface OrgLayoutProps {
  children: React.ReactNode;
  params: Promise<{ 'org-id': string }>;
}

export default async function OrganizationLayout(props: OrgLayoutProps) {
  const params = await props.params;

  const {
    'org-id': orgId
  } = params;

  const {
    children
  } = props;

  const { role } = await getUserOrgRole(orgId);
  const isOfficer = ['President', 'VP', 'PRO'].includes(role || '');
  return (
      <StudentVerticalNavigation isOfficer={isOfficer}>{children}</StudentVerticalNavigation>
  );
}
