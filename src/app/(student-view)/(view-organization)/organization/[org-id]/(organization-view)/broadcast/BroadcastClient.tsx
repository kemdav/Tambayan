// app/.../broadcast/BroadcastClient.tsx
"use client";

import { Tables } from "@/lib/database.types";
import { FaBullhorn } from "react-icons/fa";

type Broadcast = Tables<'broadcast'>;

interface BroadcastClientProps {
    initialBroadcasts: Broadcast[];
    title: string;
    description: string;
}

const formatBroadcastDate = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
};

export default function BroadcastClient({ initialBroadcasts, title, description }: BroadcastClientProps) {
    return (
        <main className="w-full max-w-3xl mx-auto p-4 sm:p-6">
            <div className="flex items-center gap-4 mb-2">
                <FaBullhorn className="text-3xl text-blue-500"/>
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            </div>
            <p className="text-gray-600 mb-6 border-b pb-4">{description}</p>
            
            {initialBroadcasts.length === 0 ? (
                <div className="text-center py-10"><p className="text-gray-500">No recent broadcasts found.</p></div>
            ) : (
                <div className="space-y-6">
                    {initialBroadcasts.map((broadcast) => (
                        <div key={broadcast.id} className="bg-white p-6 rounded-lg shadow-md border">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-xl font-semibold text-gray-900">{broadcast.title}</h2>
                                <span className="text-sm text-gray-500 whitespace-nowrap">{formatBroadcastDate(broadcast.date)}</span>
                            </div>
                             <p className="text-xs text-gray-500 mb-4 capitalize">For: {broadcast.recipient}</p>
                            <p className="text-gray-700 whitespace-pre-line mb-4">{broadcast.message}</p>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}