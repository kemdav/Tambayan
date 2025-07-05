// lib/actions/student.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/database.types"; // Import the generated types

export async function getStudentProfile(studentId: number): Promise<Tables<'student'> | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('student')
        .select('*')
        .eq('studentid', studentId)
        .single(); // .single() is great for fetching one record

    if (error) {
        console.error("Error fetching student profile:", error.message);
        return null;
    }

    return data;
}