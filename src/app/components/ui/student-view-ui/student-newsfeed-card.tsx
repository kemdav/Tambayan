"use client"
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster, Commenter, Event } from '@/lib/types/types';
import { CommentComponent } from "../general/comment-component";
import CommentToOrgCard from "../general/comment-toOrg-card";
import { UpcomingEventComponent } from "../general/upcoming-event-component";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
    officialPosts: Poster[]; // <-- Add this
    communityPosts: Poster[]; // <-- Add this
}

const OfficialPostPage = ({ posts }: { posts: Poster[] }) => {
    // ...
    return (
        <div className="mt-3">
            {posts.length === 0 ? (<p>No official posts in your feed yet.</p>) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
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
                            currentUserID={post.posterID}
                            posterID="might_remove"
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}


const CommunityPostPage = ({ posts }: { posts: Poster[] }) => {
    // ...
    return (
        <div className="mt-3">
            {posts.length === 0 ? (<p>No community posts in your feed yet.</p>) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
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
                            currentUserID={post.posterID}
                            posterID="might_remove"
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
export const UpcomingEvents: Event[] = [
    {
        eventID: "1",
        orgID: "1",
        orgName: "ICPEP",
        title: "event",
        date: "September 9, 2901",
        location: "Cebu City",
        description: "Join us on the blah",
        status: "Active",
        registered: true,
    },
    {
        eventID: "2",
        orgID: "1",
        orgName: "DOST",
        title: "event",
        date: "September 9, 2901",
        location: "Cebu City",
        description: "Join us on the blah",
        status: "Active",
        registered: true,
    },
    {
        eventID: "3",
        orgID: "1",
        orgName: "CE",
        title: "event",
        date: "September 9, 2901",
        location: "Cebu City",
        description: "Join us on the blah",
        status: "Active",
        registered: true,
    },
    {
        eventID: "4",
        orgID: "1",
        orgName: "NURSE",
        title: "event",
        date: "September 9, 2901",
        location: "Cebu City",
        description: "Join us on the blah",
        status: "Active",
        registered: true,
    },
  ];


const UpcomingEventsPage = () => {
    return (
        <div className="mt-3">
            {UpcomingEvents.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {UpcomingEvents.map((UpcomingEvents) => (
                        <UpcomingEventComponent 
                        key={UpcomingEvents.eventID}
                        orgName={UpcomingEvents.orgName}
                        daysAgo={2}
                        eventTitle={UpcomingEvents.title}
                        eventDescription={UpcomingEvents.description}
                        buttonLabel={UpcomingEvents.registered ? "Registered" : "Register"}></UpcomingEventComponent>
                    ))}
                </ul>
            )}
        </div>
    );
}




export default function StudentNewsfeedCard({ 
    className, 
    myButtons, 
    selectedButtonId, 
    onButtonSelect,
    officialPosts,  // <-- Destructure new props
    communityPosts
}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect} />
            {/* Pass the fetched posts to the correct sub-page */}
            {selectedButtonId === "officialPost" && <OfficialPostPage posts={officialPosts} />}
            {selectedButtonId === "communityPost" && <CommunityPostPage posts={communityPosts} />}
            {selectedButtonId === "upcomingEvents" && <UpcomingEventsPage />}
        </div>
    );
}