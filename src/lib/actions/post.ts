// lib/actions/post.ts

"use server";

import { createClient } from "@/lib/supabase/server";
import type { Poster } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';
import type { TablesUpdate } from "@/lib/database.types";
import { Tables } from "@/lib/database.types";
import type { CommentType } from "@/lib/types/types";
import { differenceInDays } from 'date-fns';

type OrgPostQueryResult = Tables<'post'> & {
    student: Pick<Tables<'student'>, 'fname' | 'lname' | 'picture' | 'user_id' | 'studentid'> | null; // <-- ADD 'studentid' HERE
    organizations: Pick<Tables<'organizations'>, 'orgname'> | null;
};

export type PostWithLikesResult = Tables<'post'> & {
    student: {
        fname: string | null;
        lname: string | null;
        picture: string | null;
        user_id: string | null;
        studentid: number;
    } | null;
    organizations: {
        orgname: string | null;
         picture: string | null;
    } | null;
    post_likes: { user_id: string }[];
    comments: CommentType[];
};

export async function getOrgPosts(orgId: string, isOfficial: boolean): Promise<Poster[]> {
    console.log(`[getOrgPosts] START: Called for orgId: ${orgId}, isOfficial: ${isOfficial}`);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // The base query with the corrected select statement
    const { data, error } = await supabase
        .from("post")
        .select(`
            *,
            student:studentid (
                fname,
                lname,
                picture,
                user_id,
                studentid
            ),
            organizations:orgid (
                orgname
            ),
            post_likes ( user_id ),
            comments ( *, author:student(fname, lname, picture) )
        `)
        .eq("orgid", orgId)
        .eq("isofficial", isOfficial)
        .order("posted", { ascending: false });

    if (error) {
        console.error(`[getOrgPosts] ERROR fetching posts for org ${orgId}:`, error.message);
        return [];
    }

    if (!data || data.length === 0) {
        console.log(`[getOrgPosts] INFO: No posts found for org ${orgId}.`);
        return [];
    }

    // Use our new, more specific type for the cast
    const typedData: PostWithLikesResult[] = data as any; // Using 'any' here is a pragmatic step if typing the query perfectly is complex

    const formattedPosts: Poster[] = typedData.map((post) => {
        // ... (your existing mapping logic for student, organization, posterName, etc.)
        const student = post.student;
        const organization = post.organizations;
        const currentPosterName = isOfficial ? (organization?.orgname ?? "Official Post") : (student ? `${student.fname} ${student.lname}` : "Unknown User");
        const currentPosterID = isOfficial ? orgId : (student?.studentid?.toString() || "unknown");
        const currentPosterPictureUrl = isOfficial ? null : (student?.picture ?? null);
        const currentPosterUserID = isOfficial ? null : (student?.user_id ?? null);

        // --- NEW LIKE LOGIC ---
        // Get the total like count from the post_likes relation
        const likeCount = post.post_likes.length;

        // Check if the user_has_liked array has any items. If so, the user has liked the post.
       const hasLiked = user ? post.post_likes.some(like => like.user_id === user.id) : false;
        // --- END NEW LIKE LOGIC ---

        return {
            postID: post.postid.toString(),
            posterName: currentPosterName,
            posterID: currentPosterID,
            posterPictureUrl: currentPosterPictureUrl,
            title: post.subject,
            posterUserID: currentPosterUserID,
            imageSrc: post.attachment ?? null,
            content: post.body ?? 'No content',
            likes: likeCount, // Use the new, accurate count
            comments: post.comments ?? [], 
            daysSincePosted: post.posted ? differenceInDays(new Date(), new Date(post.posted)) : 0,
            recipient: organization?.orgname ?? 'Direct Post',
            initialHasLiked: hasLiked, // Pass this new property to the client
        };
    });

    return formattedPosts;
}

export async function getPostsByStudent(studentId: number): Promise<Poster[]> {
    console.log(`[getPostsByStudent] START: Called for studentId: ${studentId}`);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // The base query with the corrected select statement
    const { data, error } = await supabase
        .from("post")
        .select(`
            *,
            student:studentid (
                fname,
                lname,
                picture,
                user_id,
                studentid
            ),
            organizations:orgid (
                orgname
            ),
            post_likes ( user_id ),
            comments ( *, author:student(fname, lname, picture) )
        `)
        .eq("studentid", studentId)
        .order("posted", { ascending: false });

    if (error) {
        console.error(`[getPostsByStudent] ERROR fetching posts for student ${studentId}:`, error.message);
        console.log("[getPostsByStudent] Returning empty array due to error.");
        return [];
    }

    if (!data) {
        console.log(`[getPostsByStudent] WARN: Data is null for student ${studentId}, returning empty array.`);
        return [];
    }

    if (data.length === 0) {
        console.log(`[getPostsByStudent] INFO: No posts found for student ${studentId}.`);
    } else {
        console.log(`[getPostsByStudent] INFO: Raw data fetched for student ${studentId}:`, data);
    }

    //console.log(`[getPostsByStudent] Raw 'attachment' values for student ${studentId}:`);
    data.forEach((post, index) => {
        console.log(`  Post ${post.postid} attachment:`, post.attachment);
    });

    const typedData: PostWithLikesResult[] = data as any;

    // The 'data' is an array of posts. We'll map over it.
    const formattedPosts: Poster[] = typedData.map((post) => {
        const student = post.student;
        const organization = post.organizations; 

        const likeCount = post.post_likes.length;
        const hasLiked = user ? post.post_likes.some(like => like.user_id === user.id) : false;

        return {
            postID: post.postid.toString(),
            // Use the 'student' variable, which is now a single object (or null)
            posterName: student ? `${student.fname} ${student.lname}` : "Unknown User",
            posterID: studentId.toString(),
            posterPictureUrl: student?.picture,
            title: post.subject,
            posterUserID: student?.user_id,
            imageSrc: post.attachment ?? null,
            content: post.body ?? 'No content',
            likes: likeCount,
            comments: post.comments ?? [], 
            daysSincePosted: post.posted ? differenceInDays(new Date(), new Date(post.posted)) : 0,
            // Use the 'organization' variable
            recipient: organization?.orgname ?? 'Direct Post',
            initialHasLiked: hasLiked
        };

        // ================== FIX ENDS HERE ==================
    });

    console.log(`[getPostsByStudent] Formatted 'imageSrc' values for student ${studentId}:`);
    formattedPosts.forEach((p, index) => {
        console.log(`  Formatted Post ${p.postID} imageSrc:`, p.imageSrc);
    });


    return formattedPosts;
}

export async function createPost(formData: FormData) {
    const supabase = await createClient();

    // 1. Get User and Student Profile (for security)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { error: "You must be logged in to post." };
    }

    const { data: student, error: studentError } = await supabase
        .from('student')
        .select('studentid')
        .eq('user_id', user.id)
        .single();

    if (studentError || !student) {
        return { error: "Could not find your student profile." };
    }

    // 2. Extract data from FormData
    const orgId = formData.get('orgId') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const photoFile = formData.get('photoFile') as File | null;
    let attachmentUrl: string | null = null;

    // Basic validation
    if (!orgId || !content) {
        return { error: "Organization and content are required." };
    }

    // 3. Handle File Upload (if a file exists)
    if (photoFile && photoFile.size > 0) {
        const fileExtension = photoFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `${user.id}/${fileName}`; // Store files in a folder named after the user's UUID

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-attachments') // Use the bucket name you created
            .upload(filePath, photoFile);

        if (uploadError) {
            console.error("Error uploading file:", uploadError);
            return { error: "Failed to upload photo." };
        }

        // Get the public URL of the uploaded file
        const { data: urlData } = supabase.storage
            .from('post-attachments')
            .getPublicUrl(filePath);

        attachmentUrl = urlData.publicUrl;
    }

    // 4. Insert the post into the database
    const { error: insertError } = await supabase
        .from('post')
        .insert({
            orgid: orgId,
            studentid: student.studentid, // Use the securely fetched studentid
            subject: title,
            body: content,
            attachment: attachmentUrl, // The path to the image in Storage
            isofficial: false, // Student posts are not official
            posted: new Date().toISOString(),
            ispinned: false
        });

    if (insertError) {
        console.error("Error inserting post:", insertError);
        return { error: "Failed to create post." };
    }

    // 5. Tell Next.js to refresh the data on the profile page
    revalidatePath('/profile');
    revalidatePath('/organization/[org-id]/newsfeed', 'page')

    return { success: "Post created successfully!" };
}

export async function deletePost(postId: number) {
    const supabase = await createClient();

    // We don't strictly need to get the user's studentid here because RLS
    // will enforce the security rule. The .delete() will simply fail
    // if the RLS policy check doesn't pass for the current user.

    const { error } = await supabase
        .from('post')
        .delete()
        .eq('postid', postId);

    if (error) {
        console.error("Error deleting post:", error);
        return { error: "Failed to delete post. " + error.message };
    }

    // Refresh the page data
    revalidatePath('/profile');
    return { success: "Post deleted successfully." };
}

export async function updatePost(formData: FormData) {
    const supabase = await createClient();

    // Get data from form
    const postId = formData.get('postId') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const photoFile = formData.get('photoFile') as File | null; // Get the file from FormData
    const removeImageFlag = formData.get('removeImage') === 'true';

    if (!postId || !content) {
        return { error: "Post ID and content are required." };
    }

    const updatePayload: TablesUpdate<'post'> = {
        subject: title,
        body: content,
    };

    let oldAttachmentUrl: string | null = null;

    if (photoFile || removeImageFlag) {
        const { data: currentPost, error: fetchError } = await supabase
            .from('post')
            .select('attachment')
            .eq('postid', Number(postId))
            .single();

        if (fetchError || !currentPost) {
            console.error("Error fetching current post for attachment update:", fetchError?.message);
            // Decide if this should block the update or just skip attachment handling
            // For now, let's allow content update even if image fetch fails, but warn.
        } else {
            oldAttachmentUrl = currentPost.attachment;
        }
    }

    if (photoFile && photoFile.size > 0) {
        // Ensure user is authenticated for upload
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return { success: false, error: "Authentication required to upload image." };
        }

        const fileExtension = photoFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExtension}`;
        const filePath = `${user.id}/${fileName}`; // Store files in user-specific folder

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-attachments') // Your bucket name
            .upload(filePath, photoFile);

        if (uploadError) {
            console.error("Error uploading new file for post update:", uploadError);
            return { success: false, error: "Failed to upload new photo." };
        }

        // Get the public URL of the newly uploaded file
        const { data: urlData } = supabase.storage
            .from('post-attachments')
            .getPublicUrl(filePath);

        updatePayload.attachment = urlData.publicUrl; // Set the new attachment URL

        // Optional: Delete the old image from storage if it exists and is different
        if (oldAttachmentUrl && oldAttachmentUrl !== urlData.publicUrl) {
            try {
                // Extract the path from the full URL for removal (e.g., "user_id/filename.jpg")
                const pathToRemove = oldAttachmentUrl.split('/post-attachments/')[1];
                if (pathToRemove) {
                    const { error: removeError } = await supabase.storage.from('post-attachments').remove([pathToRemove]);
                    if (removeError) console.warn("Failed to remove old attachment from storage:", removeError.message);
                }
            } catch (e) {
                console.warn("Error processing old attachment URL for removal:", e);
            }
        }

    } else if (removeImageFlag) {
        // User explicitly chose to remove the image
        updatePayload.attachment = null; // Set attachment to null in the database

        // Optional: Delete the old image from storage
        if (oldAttachmentUrl) {
            try {
                const pathToRemove = oldAttachmentUrl.split('/post-attachments/')[1];
                if (pathToRemove) {
                    const { error: removeError } = await supabase.storage.from('post-attachments').remove([pathToRemove]);
                    if (removeError) console.warn("Failed to remove old attachment from storage:", removeError.message);
                }
            } catch (e) {
                console.warn("Error processing old attachment URL for removal:", e);
            }
        }
    }

    const { error } = await supabase
        .from('post')
        .update(updatePayload)
        .eq('postid', Number(postId)); // RLS will automatically check ownership

    if (error) {
        console.error("Error updating post:", error);
        return { error: "Failed to update post. " + error.message };
    }

    revalidatePath('/profile');
    return { success: true, message: "Post updated." };
}