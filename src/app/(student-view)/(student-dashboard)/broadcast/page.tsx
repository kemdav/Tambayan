// app/broadcast/page.tsx
"use server";

import { getBroadcastsFor } from "@/lib/actions/broadcast";
// We can reuse the same client component!
import BroadcastClient from "@/app/(student-view)/(view-organization)/organization/[org-id]/(organization-view)/broadcast/BroadcastClient";

export default async function StudentBroadcastPage() {
    // Call the action with the 'student' context
    const broadcasts = await getBroadcastsFor('student');

    return (
        <BroadcastClient
            initialBroadcasts={broadcasts}
            title="University Broadcasts"
            description="Announcements and messages from your university."
        />
    );
}