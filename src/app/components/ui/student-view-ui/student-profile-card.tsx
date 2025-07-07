
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
import { StudentComment } from "@/lib/actions/comment";
import StudentCommentCard from "./studdent-comment-card";
import { StudentProfile } from "@/lib/types/database";
import EditAboutModal from "./edit-about-modal";


interface AboutPageProps {
    studentId: string;
    studentCourse: string | null;
    studentEmail: string | null;
    studentYear: string | null;
    // These seem like placeholder data, so let's make them optional
    studentJoinDate?: string;
    studentEventsJoined?: string;
    studentTotalOrg?: string;
    // Add the new props
    aboutText: string | null;
    onEditClick: () => void;
    isOwnProfile: boolean;
}

// 2. Fix the AboutPage component to accept ONE props object
const AboutPage = ({
    studentId,
    studentCourse,
    studentEmail,
    studentYear,
    studentJoinDate,
    studentEventsJoined,
    studentTotalOrg,
    aboutText,
    onEditClick,
    isOwnProfile
}: AboutPageProps) => {

    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:gap-10">
                    <div>
                        <p><strong>Student ID:</strong> {studentId}</p>
                        <p><strong>Major:</strong> {studentCourse || 'N/A'}</p>
                        <p><strong>Email:</strong> {studentEmail || 'N/A'}</p>
                        <p><strong>Year:</strong> {studentYear || 'N/A'}</p>
                    </div>
                    <div>
                        {/* These are likely placeholders, can be removed if not in your profile object */}
                        <p><strong>Joined:</strong> {studentJoinDate || 'N/A'}</p>
                        <p><strong>Events Joined:</strong> {studentEventsJoined || 'N/A'} events</p>
                        <p><strong>Joined Organizations:</strong> {studentTotalOrg || 'N/A'}</p>
                    </div>
                </div>
                <div>
                    <p className="text-action-forest-green">
                        <strong>Description </strong>
                        {isOwnProfile && <Button onClick={onEditClick}>Edit Description</Button>}
                    </p>
                    <p className="max-w-250 text-action-forest-green whitespace-pre-line">
                        {aboutText || "No description provided."}
                    </p>
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

const CommentPage = ({ comments }: { comments: StudentComment[] }) => {
    
    return (
        <div className="mt-3">
            {comments.length === 0 ? (
                <p>You have not made any comments yet.</p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((comment, i) => (
                        <li key={i}>
                            <StudentCommentCard comment={comment} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}


interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
    currentUserID: string;
    posts: Poster[];
    initialComments: StudentComment[];
    profile: StudentProfile;
    onProfileUpdate: (updatedData: Partial<StudentProfile>) => void;
    isOwnProfile: boolean;
}


export default function StudentProfileCard({
    className,
    myButtons,
    initialComments,
    profile,
    onProfileUpdate,
    currentUserID,
    selectedButtonId,
    posts,
    onButtonSelect,
    isOwnProfile
}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleSaveAbout = (newAboutText: string) => {
        onProfileUpdate({ about: newAboutText });
    };

    return (
        <>
            <EditAboutModal 
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentAbout={profile.about}
                onSave={handleSaveAbout}
            />
            <div className={combinedClassName}>
                <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect} />
                {selectedButtonId === "about" && (
                    // 3. Update the call to AboutPage, passing props from the 'profile' object
                    <AboutPage
                        studentId={profile.studentid.toString()}
                        studentCourse={profile.course}
                        studentEmail={profile.email}
                        studentYear={profile.yearlevel}
                        aboutText={profile.about}
                        onEditClick={() => setIsEditModalOpen(true)}
                        // Pass placeholders or remove if not needed
                        studentJoinDate="Sep 2024" 
                        studentEventsJoined="0"
                        studentTotalOrg="0"
                        isOwnProfile={isOwnProfile}
                    />
                )}
                {selectedButtonId === "post" && <PostPage posts={posts} currentUserID={currentUserID} />}
                {selectedButtonId === "comment" && <CommentPage comments={initialComments} />}
            </div>
        </>
    );
}