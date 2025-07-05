export interface Poster {
    recipient: string | undefined;
    postID: string;
    posterID: string;
    posterName: string;
    posterUserID?: string | null;
    posterPictureUrl?: string | null;
    title?: string | null;
    daysSincePosted: number;
    content: string;
    likes: number;
    comments: number;
}

export interface Commenter {
    commentID: string;
    postTitle: string;
    organizationPosted: string;
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

export interface Post {
    id: string; // Always good to have a unique ID
    posterName: string;
    avatarSrc?: string | null;
    daysSincePosted: number;
    title?: string;
    content: string;
    imageSrc?: string;
    likes: number;
    comments: number;
    tags?: string[];
    orgLabel?: string;
    recipient?: string;
    // Event-specific fields
    isEvent: boolean;
    eventLocation?: string;
    eventDate?: string;
    registrationStart?: Date;
    registrationEnd?: Date;
}