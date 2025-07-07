// lib/actions/newsfeed.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { Poster } from "@/lib/types/types"; // Your Poster type
import { PostWithLikesResult } from "./post"; // Assuming you have this type from previous steps
import { differenceInDays } from 'date-fns';

export async function getNewsfeedPosts(isOfficial: boolean): Promise<Poster[]> {
    console.log(`[getNewsfeedPosts] Fetching posts, isOfficial: ${isOfficial}`);
    const supabase = await createClient();

    // 1. Get the current user. A newsfeed only makes sense for a logged-in user.
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        console.log("[getNewsfeedPosts] No user found, returning empty array.");
        return [];
    }

    // 2. Get the student ID associated with the user
    const { data: student, error: studentError } = await supabase
        .from('student')
        .select('studentid')
        .eq('user_id', user.id)
        .single();
    
    if (studentError || !student) {
        console.error("[getNewsfeedPosts] Could not find student profile for user.", studentError?.message);
        return [];
    }
    
    // 3. Get the list of organization IDs the student is subscribed to.
    // The 'subscribedorg' table is perfect for this.
    const { data: subscriptions, error: subError } = await supabase
        .from('subscribedorg')
        .select('orgid')
        .eq('studentid', student.studentid);

    if (subError) {
        console.error("[getNewsfeedPosts] Error fetching subscriptions:", subError.message);
        return [];
    }

    if (!subscriptions || subscriptions.length === 0) {
        console.log("[getNewsfeedPosts] User is not subscribed to any organizations.");
        return [];
    }

    // Extract just the organization IDs into an array: ['org_1', 'org_2', ...]
    const subscribedOrgIds = subscriptions.map(sub => sub.orgid);
    console.log("[getNewsfeedPosts] User is subscribed to orgs:", subscribedOrgIds);

    // 4. Fetch the posts.
    const { data: posts, error: postsError } = await supabase
        .from('post')
        .select(`
            *,
            student:studentid (*),
            organizations:orgid (
                orgname,
                picture 
            ),
            post_likes ( user_id ),
            comments ( *, author:student(*) )
        `)
        .in('orgid', subscribedOrgIds)
        .eq('isofficial', isOfficial)
        .order('posted', { ascending: false });

    if (postsError) {
        console.error("[getNewsfeedPosts] Error fetching posts:", postsError.message);
        return [];
    }
    
    if (!posts || posts.length === 0) {
        return [];
    }

    console.log(`[getNewsfeedPosts] Found ${posts.length} posts.`);

    // 5. Format the data into your 'Poster' type (same logic as before)
    const typedData: PostWithLikesResult[] = posts as any;
    const formattedPosts: Poster[] = typedData.map((post) => {
         const hasLiked = user ? post.post_likes.some((like: { user_id: string }) => like.user_id === user.id) : false;
        return {
            postID: post.postid.toString(),
            posterName: post.isofficial ? post.organizations?.orgname ?? 'Official' : `${post.student?.fname} ${post.student?.lname}`,
            posterID: post.student?.studentid.toString() ?? 'unknown',
            posterPictureUrl: post.isofficial ? post.organizations?.picture : post.student?.picture,
            title: post.subject,
            posterUserID: post.student?.user_id,
            imageSrc: post.attachment,
            content: post.body ?? '',
            likes: post.post_likes.length,
            comments: post.comments ?? [],
            daysSincePosted: post.posted ? differenceInDays(new Date(), new Date(post.posted)) : 0,
            recipient: post.organizations?.orgname ?? 'Unknown',
            initialHasLiked: hasLiked
        };
    });

    return formattedPosts;
}