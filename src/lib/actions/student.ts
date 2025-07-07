// lib/actions/student.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/lib/database.types"; // Import the generated types
import { revalidatePath } from "next/cache";

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
export async function updateStudentAbout(aboutText: string) {
    const supabase = await createClient();

    // 1. Get the current user to ensure we update the correct profile
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to update your profile." };
    }

    // 2. Update the 'about' column in the student table where the user_id matches.
    const { error } = await supabase
        .from('student')
        .update({ about: aboutText })
        .eq('user_id', user.id);

    if (error) {
        console.error("Error updating student about text:", error);
        return { error: "Failed to update description." };
    }

    // 3. Revalidate the profile page path to ensure the new data is shown on refresh.
    revalidatePath('/profile');

    return { success: true, newAboutText: aboutText };
}