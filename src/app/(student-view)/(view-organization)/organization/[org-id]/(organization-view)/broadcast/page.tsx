// app/.../broadcast/page.tsx
"use server";

import { getBroadcastsFor } from "@/lib/actions/broadcast";
import BroadcastClient from "./BroadcastClient";

export default async function OrgBroadcastPage() {
    // Call the action with the 'organization' context
    const broadcasts = await getBroadcastsFor('organization');

    return (
        <BroadcastClient
            initialBroadcasts={broadcasts}
            title="Organization Broadcasts"
            description="Announcements and messages relevant to all organizations."
        />
    );
}