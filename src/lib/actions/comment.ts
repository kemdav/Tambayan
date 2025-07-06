"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Tables } from "@/lib/database.types";

export type StudentComment = Tables<'comments'> & {
    post: Pick<Tables<'post'>, 'postid' | 'subject'> | null;
};
export async function getCommentsByStudent(studentId: number): Promise<StudentComment[]> {
    console.log(`[getCommentsByStudent] Fetching comments for studentId: ${studentId}`);
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('comments')
        .select(`
            *,
            post:postid (
                postid,
                subject
            )
        `)
        .eq('studentid', studentId)
        .order('posted', { ascending: false });

    if (error) {
        console.error("Error fetching student comments:", error.message);
        return [];
    }

    if (!data) {
        return [];
    }

    console.log(`[getCommentsByStudent] Found ${data.length} comments.`);
    return data as StudentComment[];
}

export async function addComment(postId: number, commentText: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to comment." };
    }

    if (!commentText.trim()) {
        return { error: "Comment cannot be empty." };
    }

    const { data: student } = await supabase
        .from('student')
        .select('studentid')
        .eq('user_id', user.id)
        .single();

    if (!student) {
        return { error: "Could not find your student profile." };
    }

    const { error } = await supabase.from('comments').insert({
        postid: postId,
        studentid: student.studentid, // Or user_id if you use my suggested schema
        comment_text: commentText, // Assuming your column is named 'comment'
        posted: new Date().toISOString(),
    });

    if (error) {
        console.error("Error adding comment:", error);
        return { error: "Failed to add comment." };
    }

    // Revalidate the path to show the new comment on refresh
    // This is less ideal than optimistic updates, which we'll do on the client
    revalidatePath('/organization/[org-id]/newsfeed', 'page');
    revalidatePath('/profile');

    return { success: true };
}