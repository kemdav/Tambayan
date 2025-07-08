// app/.../accreditation/page.tsx
"use server";

import { getUserOrgRole } from "@/lib/actions/permissions";
import { getOrganizationProfile } from "@/lib/actions/organization";
import { getAccreditationStatus } from "@/lib/actions/accreditation";
import AccreditationClient from "./AccreditationClient";

interface PageProps {
  params: { 'org-id': string };
}

export default async function AccreditationPage({ params: { 'org-id': orgId } }: PageProps) {
    // Define the current academic year (you can make this dynamic later)
    const academicYear = "2024-2025";

    // Fetch all necessary data in parallel
    const [
        organization,
        { role: currentUserRole },
        accreditationStatus
    ] = await Promise.all([
        getOrganizationProfile(orgId),
        getUserOrgRole(orgId),
        getAccreditationStatus(orgId, academicYear)
    ]);

    // Define who has permission to submit. Let's say only the President.
    const canSubmit = currentUserRole === 'President';

    if (!organization) {
        return <div>Organization not found.</div>;
    }

    return (
        <AccreditationClient
            orgId={orgId}
            organizationName={organization.orgname || "Your Organization"}
            academicYear={academicYear}
            initialStatus={accreditationStatus}
            canSubmit={canSubmit}
        />
    );
}