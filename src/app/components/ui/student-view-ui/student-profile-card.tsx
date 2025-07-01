
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
import DropDownRole from "../general/dropdown/dropdown-role";
import { DropdownStatus } from "../general/dropdown/dropdown-status";

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

const AboutPage = ({ studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg }: studentProps) => {

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

const options = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest" },
  { value: "mostLikedAllTime", label: "Most Liked All Time" },
  { value: "mostLikedMonth", label: "Most Liked Month" },
  { value: "mostLikedWeek", label: "Most Liked Week" }
];
const PostPage = () => {
    return (
        <div className="mt-3">
            <div className="mb-3">
                <DropDownRole options={options} placeholder="Filtering" width="w-xs"></DropDownRole>
            </div>
            {Posts.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {Posts.map((Posts) => (
                        <DisplayPostComponent key={Posts.postID} posterName={Posts.posterName}
                            daysSincePosted={Posts.daysSincePosted}
                            content={Posts.content}
                            likes={Posts.likes}
                            comments={Posts.comments}
                            recipient="ICPEP" />
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