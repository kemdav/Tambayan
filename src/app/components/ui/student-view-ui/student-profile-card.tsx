
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


interface Props extends studentProps {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    posts: Poster[];
    onButtonSelect: (id: string) => void;
    currentUserID: string;
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


const options = [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest" },
    { value: "mostLikedAllTime", label: "Most Liked All Time" },
    { value: "mostLikedMonth", label: "Most Liked Month" },
    { value: "mostLikedWeek", label: "Most Liked Week" }
];
const PostPage = ({ posts, currentUserID }: { posts: Poster[], currentUserID: string }) => {
    console.log("PostPage received posts:", posts);
    console.log("PostPage received currentUserID:", currentUserID);
    return (
        <div className="mt-3">
            <div className="mb-3">
                <DropDownRole options={options} placeholder="Filtering" width="w-xs"></DropDownRole>
            </div>
            {posts.length === 0 ? (<p>No posts found for this user.</p>) : ( // Use 'posts' here
                <ul className="space-y-4">
                    {posts.map((post) => ( // Use 'post' as the iteration variable
                        <DisplayPostComponent
                            key={post.postID}
                            postID={post.postID}
                            posterName={post.posterName}
                            avatarSrc={post.posterPictureUrl}
                            title={post.title}
                            imageSrc={post.imageSrc}
                            posterUserID={post.posterUserID}
                            daysSincePosted={post.daysSincePosted}
                            content={post.content}
                            likes={post.likes}
                            comments={post.comments}
                            recipient={post.recipient} 
                            initialHasLiked={post.initialHasLiked}
                            currentUserID={currentUserID}
                            posterID="might_remove"
                        />
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

}


export default function StudentProfileCard({ className, myButtons, currentUserID, selectedButtonId, posts, onButtonSelect, studentId, studentCourse, studentEmail, studentYear, studentJoinDate, studentEventsJoined, studentTotalOrg }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    console.log("StudentProfileCard received posts:", posts);
    
    console.log("StudentProfileCard received currentUserID:", currentUserID);
    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "about" && <AboutPage studentId={studentId} studentCourse={studentCourse} studentEmail={studentEmail} studentYear={studentYear} studentJoinDate={studentJoinDate} studentEventsJoined={studentEventsJoined} studentTotalOrg={studentTotalOrg} />}
            {selectedButtonId === "post" && <PostPage posts={posts} currentUserID={currentUserID}></PostPage>}
        </div>
    );
}