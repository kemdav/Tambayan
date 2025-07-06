"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function togglePostLike(postId: number, hasLiked: boolean) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to like a post." };
    }

    if (hasLiked) {
        // --- User wants to UNLIKE the post ---
        
        // 1. Delete the record from the post_likes table
        const { error: deleteError } = await supabase
            .from('post_likes')
            .delete()
            .match({ post_id: postId, user_id: user.id });
        
        if (deleteError) {
            console.error("Error unliking post:", deleteError);
            return { error: "Could not unlike the post." };
        }

        // 2. Decrement the likes count on the post table (RPC call is best for this)
        // For simplicity, we'll skip this for now, but a database function is ideal.
        // Let's assume for now the count is derived or handled separately.

    } else {
        // --- User wants to LIKE the post ---

        // 1. Insert a record into the post_likes table
        const { error: insertError } = await supabase
            .from('post_likes')
            .insert({ post_id: postId, user_id: user.id });

        if (insertError) {
            // Error code '23505' is for unique violation, meaning the user already liked it.
            // This is a failsafe in case the client state is out of sync.
            if (insertError.code === '23505') {
                 console.warn("User already liked this post. Syncing state.");
            } else {
                console.error("Error liking post:", insertError);
                return { error: "Could not like the post." };
            }
        }
        
        // 2. Increment the likes count on the post table (again, RPC is best)
    }

    // Tell Next.js to re-fetch data for relevant pages
    // Be specific if possible to avoid revalidating everything
    revalidatePath('/profile');
    revalidatePath('/organization/[org-id]/newsfeed'); // Adjust path as needed

    return { success: true };
}