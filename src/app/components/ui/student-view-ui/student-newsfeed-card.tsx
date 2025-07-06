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
}

export const OfficalPosts: Poster[] = [
 
  ];


const OfficialPostPage = () => {
    return (
        <div className="mt-3">
            {OfficalPosts.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {OfficalPosts.map((OfficalPosts) => (
                        <DisplayPostComponent key={OfficalPosts.postID} posterName={OfficalPosts.posterName}
                        daysSincePosted={OfficalPosts.daysSincePosted}
                        content={OfficalPosts.content}
                        likes={OfficalPosts.likes}
                        comments={OfficalPosts.comments}/>
                    ))}
                </ul>
            )}
        </div>
    );
}


export const CommunityPost: Poster[] = [

  ];


const CommunityPostPage = ( ) => {
    const router = useRouter();
    return (
        <div className="mt-3">
            {CommunityPost.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {CommunityPost.map((CommunityPost) => (
                        <DisplayPostComponent key={CommunityPost.postID} posterName={CommunityPost.posterName}
                        daysSincePosted={CommunityPost.daysSincePosted}
                        content={CommunityPost.content}
                        likes={CommunityPost.likes}
                        comments={CommunityPost.comments}
                        onAvatarClicked={()=>router.push(`/visit/${CommunityPost.posterID}`)}/>
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




export default function StudentNewsfeedCard({ className, myButtons, selectedButtonId, onButtonSelect}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    const router = useRouter();

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "officialPost" && <OfficialPostPage></OfficialPostPage>}
            {selectedButtonId === "communityPost" && <CommunityPostPage></CommunityPostPage>}
            {selectedButtonId === "upcomingEvents" && <UpcomingEventsPage></UpcomingEventsPage>}
        </div>
    );
}