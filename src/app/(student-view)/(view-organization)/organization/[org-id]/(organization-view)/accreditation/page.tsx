// src/app/.../accreditation/page.tsx
"use server";

import { getUserOrgRole } from "@/lib/actions/permissions";
import { getOrganizationProfile } from "@/lib/actions/organization";
import { getAccreditationStatus } from "@/lib/actions/accreditation";
import AccreditationClient from "./AccreditationClient";

// This is the standard, correct way to type page props

// Use destructuring directly in the function arguments
export default async function AccreditationPage(props: { params: Promise<{ 'org-id': string }> }){
    const academicYear = "2024-2025";
    const params = await props.params;
    const orgId = params['org-id'];

    const [
        organization,
        { role: currentUserRole },
        accreditationStatus
    ] = await Promise.all([
        getOrganizationProfile(orgId),
        getUserOrgRole(orgId),
        getAccreditationStatus(orgId, academicYear)
    ]);

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