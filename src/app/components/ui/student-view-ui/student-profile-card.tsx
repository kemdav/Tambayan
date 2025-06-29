
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster, Commenter } from '@/lib/types/types';
import { CommentComponent } from "../general/comment-component";
import CommentToOrgCard from "../general/comment-toOrg-card";
import { useState } from "react";
import { UpcomingEventComponent } from "../general/upcoming-event-component";
import UpcomingorgEventComponent from "../general/upcomingorg-event-component";

interface Props extends studentProps {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
}

interface studentProps {
    studentId: string;
    studentCourse: string;
    studentEmail: string;
    studentYear: string;
    studentJoinDate: string;
    studentEventsJoined: string;
    studentTotalOrg: string;
}

const RegisterIcon = (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
        <rect x="11" y="3" width="2" height="18" rx="1" fill="currentColor" />
    </svg>
);

const DeregisterIcon = (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
    >
        <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    </svg>
);

// Added more events to demonstrate scrolling and the grid layout
const baseEvents = [
    {
        id: "event-1",
        title: "Hackathon 2025",
        description: "Compete in a 24-hour hackathon with exciting prizes!",
        date: "July 10, 2025",
    },
    {
        id: "event-2",
        title: "AI & ML Conference",
        description: "Learn from top AI researchers and developers.",
        date: "August 3, 2025",
    },
    {
        id: "event-3",
        title: "Web Dev Bootcamp",
        description: "Master React, Tailwind, and backend tools in 5 days.",
        date: "September 12, 2025",
    },
    {
        id: "event-4",
        title: "Cloud Computing Talk",
        description: "Intro to AWS, Azure, and GCP for students.",
        date: "October 2, 2025",
    },
    {
        id: "event-5",
        title: "Cybersecurity Workshop",
        description: "Hands-on workshop on ethical hacking and network security.",
        date: "November 5, 2025",
    },
    {
        id: "event-6",
        title: "UI/UX Design Sprint",
        description: "Collaborate to design and prototype a new app in 48 hours.",
        date: "December 1, 2025",
    },
];

const AboutPage = ({ studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg }: studentProps) => {
    const [registrations, setRegistrations] = useState<boolean[]>(() =>
        baseEvents.map(() => false)
    );

    const events = baseEvents.map((event, index) => {
        return {
            ...event,
            buttonLabel: registrations[index] ? "Deregister" : "Register Now",
            buttonColorClass: registrations[index]
                ? "bg-gray-300 text-gray-800 hover:bg-gray-400"
                : "bg-green-500 text-white hover:bg-green-600",
            buttonIcon: registrations[index] ? DeregisterIcon : RegisterIcon,
            onButtonClick: () => {
                setRegistrations((prev) => {
                    const updated = [...prev];
                    updated[index] = !updated[index];
                    const action = updated[index] ? "Registered" : "Deregistered";
                    console.log(`${action}: ${event.title} (id: ${event.id})`);
                    return updated;
                });
            },
        };
    });
    return (<div className="flex flex-col sm:flex-row">
        <div className="flex flex-col">

            <div className="flex flex-col sm:flex-row sm:gap-10">
                <div>
                    <p className="text-action-forest-green"><strong>Student ID:</strong> {studentId}</p>
                    <p className="text-action-forest-green"><strong>Major:</strong> {studentCourse}</p>
                    <p className="text-action-forest-green"><strong>Email:</strong> {studentEmail}</p>
                    <p className="text-action-forest-green"><strong>Year:</strong> {studentYear}</p>
                </div>
                <div>
                    <p className="text-action-forest-green"><strong>Joined:</strong> {studentJoinDate}</p>
                    <p className="text-action-forest-green"><strong>Events Joined:</strong> {studentEventsJoined} events</p>
                    <p className="text-action-forest-green"><strong>Joined Organizations:</strong> {studentTotalOrg}</p>
                </div>
            </div>

            <div>
                <p className="text-action-forest-green"><strong>Description </strong><Button>Edit Description</Button></p>
                <p className="max-w-250 text-action-forest-green">This is a placeholder description for the student profile. You can edit this description to provide more details about the student.</p>
            </div>

            <div className="bg-action-seafoam-green sm:my-5 w-full h-full">
                <div className="min-h-screen bg-neutral-mint-white">
                    <UpcomingorgEventComponent events={events} />
                </div>
            </div>

        </div>

    </div>
    );
}

export const Posts: Poster[] = [
    {
        postID: "1942",
        posterName: "Excel Duran",
        daysSincePosted: 3,
        content: "This is my fifth post",
        likes: 3,
        comments: 3,
    },
    {
        postID: "2343",
        posterName: "Excel Duran",
        daysSincePosted: 4,
        content: "This is my fourth post",
        likes: 3,
        comments: 3,
    },
    {
        postID: "5742",
        posterName: "Excel Duran",
        daysSincePosted: 6,
        content: "This is my third post",
        likes: 3,
        comments: 3,
    },
    {
        postID: "2341",
        posterName: "Excel Duran",
        daysSincePosted: 8,
        content: "This is my second post",
        likes: 3,
        comments: 3,
    },
    {
        postID: "572142",
        posterName: "Excel Duran",
        daysSincePosted: 10,
        content: "This is my first post",
        likes: 3,
        comments: 3,
    }
];


const PostPage = () => {
    return (
        <div className="mt-3">
            {Posts.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {Posts.map((Posts) => (
                        <DisplayPostComponent key={Posts.postID} posterName={Posts.posterName}
                            daysSincePosted={Posts.daysSincePosted}
                            content={Posts.content}
                            likes={Posts.likes}
                            comments={Posts.comments} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export const Comments: Commenter[] = [
    {
        commentID: "1942",
        postTitle: "This is a test.",
        organizationPosted: "ICPEP",
        commenterName: "Excel Duran",
        daysSinceCommented: 3,
        content: "This is my fifth comment",
        likes: 3,
        comments: 3,
    },
    {
        commentID: "2343",
        postTitle: "This is a test.",
        organizationPosted: "ICPEP",
        commenterName: "Excel Duran",
        daysSinceCommented: 4,
        content: "This is my fourth comment",
        likes: 3,
        comments: 3,
    },
    {
        commentID: "5742",
        postTitle: "This is a test.",
        organizationPosted: "ICPEP",
        commenterName: "Excel Duran",
        daysSinceCommented: 6,
        content: "This is my third comment",
        likes: 3,
        comments: 3,
    },
    {
        commentID: "2341",
        postTitle: "This is a test.",
        organizationPosted: "ICPEP",
        commenterName: "Excel Duran",
        daysSinceCommented: 8,
        content: "This is my second comment",
        likes: 3,
        comments: 3,
    },
    {
        commentID: "572142",
        postTitle: "This is a test.",
        organizationPosted: "ICPEP",
        commenterName: "Excel Duran",
        daysSinceCommented: 10,
        content: "This is my first comment",
        likes: 3,
        comments: 3,
    }
];

const CommentPage = () => {
    return (
        <div className="mt-3">
            {Posts.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {Comments.map((Comments) => (
                        <CommentToOrgCard key={Comments.commentID}
                            commenterName={Comments.commenterName}
                            daysSinceCommented={Comments.daysSinceCommented}
                            replyText={Comments.content}
                            postTitle={Comments.postTitle}
                            postOrg={Comments.organizationPosted} />
                    ))}
                </ul>
            )}
        </div>
    );
}


export default function StudentProfileCard({ className, myButtons, selectedButtonId, onButtonSelect, studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "about" && <AboutPage studentId={studentId} studentCourse={studentCourse} studentEmail={studentEmail} studentYear={studentYear} studentJoinDate={studentJoinDate} studentEventsJoined={studentEventsJoined} studentTotalOrg={studentTotalOrg} />}
            {selectedButtonId === "post" && <PostPage></PostPage>}
            {selectedButtonId === "comment" && <CommentPage></CommentPage>}
        </div>
    );
}