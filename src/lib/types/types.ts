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

export interface Student {
    studentID: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    picture: string; // Change to right datatype later
    universityID: string;
    course: string;
    yearLevel: number;
    about: string;
}

export interface Event {
    eventID: string;
    orgID: string;
    orgName: string;
    title: string;
    date: string;
    location: string;
    description: string;
    status: string;
    registered: boolean;
}