// app/search/page.tsx
"use client";

import { useState, useEffect } from "react"; // Import useEffect
import { createClient } from "@/lib/supabase/client";
import { type StudentProfile } from "@/lib/types/database";
import Link from "next/link";
import { AvatarIcon } from "@/app/components/ui/general/avatar-icon-component";

export default function SearchPage() {
    const [currentUserUniversityId, setCurrentUserUniversityId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<StudentProfile[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use useEffect to fetch the current user's profile once when the component mounts
    useEffect(() => {
        const fetchCurrentUserProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                const { data: profile, error } = await supabase
                    .from('student')
                    .select('universityid')
                    .eq('user_id', user.id)
                    .single();

                if (error) {
                    setError("Could not find your user profile to determine your university.");
                } else if (profile?.universityid) {
                    setCurrentUserUniversityId(profile.universityid);
                } else {
                    setError("Your profile is missing a university ID.");
                }
            }
        };

        fetchCurrentUserProfile();
    }, []);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchTerm.trim() || !currentUserUniversityId) return;

        setIsLoading(true);
        setResults([]); // Clear previous results
        const supabase = createClient();
        
        // Build the query
        const query = supabase
            .from('student')
            .select('*')
            // THIS IS THE NEW, CRUCIAL FILTER
            .eq('universityid', currentUserUniversityId)
            // The rest is the same
            .or(`fname.ilike.%${searchTerm}%,lname.ilike.%${searchTerm}%`);

        const { data, error } = await query;

        if (error) {
            alert("Search failed: " + error.message);
        } else {
            setResults(data || []);
        }
        setIsLoading(false);
    };

    if (error) {
        return <div className="text-center mt-10 text-red-600">{error}</div>
    }

    if (!currentUserUniversityId) {
        return <div className="text-center mt-10">Loading your profile...</div>
    }

    return (
        <div className="w-full max-w-2xl mx-auto mt-10 p-4">
            <h1 className="text-2xl font-bold mb-4">Find Students in Your University</h1>
            <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by name..."
                    className="flex-grow border rounded px-3 py-2"
                />
                <button type="submit" disabled={isLoading} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400">
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            <div className="space-y-3">
                {results.map(student => (
                    <Link href={`/student/${student.studentid}`} key={student.studentid}>
                        <div className="flex items-center gap-4 p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
                            <AvatarIcon src={student.picture} alt={student.fname || ''} className="h-12 w-12" />
                            <div>
                                <p className="font-semibold">{`${student.fname} ${student.lname}`}</p>
                                <p className="text-sm text-gray-600">{student.course || 'No course listed'}</p>
                            </div>
                        </div>
                    </Link>
                ))}
                {!isLoading && searchTerm && results.length === 0 && (
                    <p className="text-center text-gray-500">No students found for "{searchTerm}".</p>
                )}
            </div>
        </div>
    );
}