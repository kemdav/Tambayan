export interface Poster {
    postID:string;
    posterName: string;
    daysSincePosted: number;
    content: string;
    likes: number;
    comments: number;
}

export interface Commenter {
    commentID:string;
    postTitle:string;
    organizationPosted:string;
    commenterName: string;
    daysSinceCommented: number;
    content: string;
    likes: number;
    comments: number;
}