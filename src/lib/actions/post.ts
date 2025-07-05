// lib/actions/post.ts

"use server";

import { createClient } from "@/lib/supabase/server"; 
import type { Poster } from "@/lib/types/types";
import { differenceInDays } from 'date-fns';

export async function getPostsByStudent(studentId: number): Promise<Poster[]> {
    console.log(`[getPostsByStudent] START: Called for studentId: ${studentId}`);
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("post")
    .select(`
        postid,
        body,
        likes,
        comments,
        posted,
        student:post_studentid_fkey (
            fname,
            lname
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