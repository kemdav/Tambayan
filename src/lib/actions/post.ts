// lib/actions/post.ts

"use server";

import { createClient } from "@/lib/supabase/server"; 
import type { Poster } from "@/lib/types/types";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

import { differenceInDays } from 'date-fns';

export async function getPostsByStudent(studentId: number): Promise<Poster[]> {
    console.log(`[getPostsByStudent] START: Called for studentId: ${studentId}`);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("post")
    .select(`
        postid,
        subject,
        body,
        likes,
        comments,
        posted,
        student:post_studentid_fkey (
            fname,
            lname,
            picture,
            user_id
        ),
        organizations (
            orgname
        )
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

  // The 'data' is an array of posts. We'll map over it.
  const formattedPosts: Poster[] = data.map((post) => {
    
    // ================= FIX STARTS HERE =================
    
    // Check if post.student is an array and has items before accessing it
    const student = Array.isArray(post.student) ? post.student[0] : post.student;
    
    // Check if post.organizations is an array and has items
    const organization = Array.isArray(post.organizations) ? post.organizations[0] : post.organizations;

    return {
      postID: post.postid.toString(),
      // Use the 'student' variable, which is now a single object (or null)
      posterName: student ? `${student.fname} ${student.lname}` : "Unknown User",
      posterID: studentId.toString(),
      posterPictureUrl: student?.picture,
      title: post.subject, 
      posterUserID: student?.user_id,
      content: post.body ?? 'No content',
      likes: post.likes ?? 0,
      comments: post.comments ?? 0,
      daysSincePosted: post.posted ? differenceInDays(new Date(), new Date(post.posted)) : 0,
      // Use the 'organization' variable
      recipient: organization?.orgname ?? 'Direct Post'
    };
    
    // ================== FIX ENDS HERE ==================
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
      .from('post_attachments') // Use the bucket name you created
      .upload(filePath, photoFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
      return { error: "Failed to upload photo." };
    }

    // Get the public URL of the uploaded file
    const { data: urlData } = supabase.storage
      .from('post_attachments')
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
      likes: 0,
      comments: 0,
      posted: new Date().toISOString(),
      ispinned: false
    });

  if (insertError) {
    console.error("Error inserting post:", insertError);
    return { error: "Failed to create post." };
  }

  // 5. Tell Next.js to refresh the data on the profile page
  revalidatePath('/profile');

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

  if (!postId || !content) {
    return { error: "Post ID and content are required." };
  }

  const { error } = await supabase
    .from('post')
    .update({
      subject: title,
      body: content,
    })
    .eq('postid', Number(postId)); // RLS will automatically check ownership

  if (error) {
    return { error: "Failed to update post. " + error.message };
  }

  revalidatePath('/profile');
  return { success: "Post updated." };
}