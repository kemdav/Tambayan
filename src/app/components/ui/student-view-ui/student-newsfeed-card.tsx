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
import { differenceInDays } from 'date-fns';
import { Tables } from "@/lib/database.types";
import { toggleEventRegistration } from "@/lib/actions/events";
type EventWithOrg = Tables<'events'> & {
    organizations: Pick<Tables<'organizations'>, 'orgname' | 'picture'> | null;
};
interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
    officialPosts: Poster[]; // <-- Add this
    communityPosts: Poster[]; // <-- Add this
    upcomingEvents: EventWithOrg[];
    registeredEvents: EventWithOrg[];
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

const UpcomingEventsPage = ({ events, registeredEventIds }: { events: EventWithOrg[], registeredEventIds: Set<number> }) => {
    const handleToggle = async (eventId: number, isRegistered: boolean) => {
        await toggleEventRegistration(eventId, isRegistered);
    };

    return (
        <div className="mt-3">
            {events.length === 0 ? (<p>No upcoming events in your feed.</p>) : (
                <ul className="space-y-4">
                    {events.map((event) => {
                        const isRegistered = registeredEventIds.has(event.eventid);
                        return (
                            <UpcomingEventComponent
                                key={event.eventid}
                                orgName={event.organizations?.orgname || 'Org'}
                                avatarSrc={event.organizations?.picture}
                                eventDate={event.date}
                                eventLocation={event.location}
                                eventTitle={event.title || 'Event'}
                                eventDescription={event.description || ''}
                                buttonLabel={isRegistered ? "Unregister" : "Register"}
                                buttonColorClass={isRegistered ? "bg-gray-500 hover:bg-gray-600" : "bg-green-600 hover:bg-green-700"}
                                onButtonClick={() => handleToggle(event.eventid, isRegistered)}
                            />
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

const RegisteredEventsPage = ({ events }: { events: EventWithOrg[] }) => {
    const router = useRouter();
    return (
        <div className="mt-3">
            {events.length === 0 ? (<p>You have not registered for any events.</p>) : (
                <ul className="space-y-4">
                    {events.map((event) => (
                        <UpcomingEventComponent
                            key={event.eventid}
                            orgName={event.organizations?.orgname || 'Org'}
                            avatarSrc={event.organizations?.picture}
                            eventDate={event.date}
                            eventLocation={event.location}
                            eventTitle={event.title || 'Event'}
                            eventDescription={event.description || ''}
                            buttonLabel="View Organization"
                            onButtonClick={() => {
                                if (event.orgid) {
                                    router.push(`/organization/${event.orgid}/newsfeed`);
                                }
                            }}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};




export default function StudentNewsfeedCard({
    className,
    myButtons,
    selectedButtonId,
    onButtonSelect,
    officialPosts,  // <-- Destructure new props
    communityPosts,
    upcomingEvents, registeredEvents
}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    const registeredEventIds = new Set(registeredEvents.map(e => e.eventid));
    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect} />
            {/* Pass the fetched posts to the correct sub-page */}
            {selectedButtonId === "officialPost" && <OfficialPostPage posts={officialPosts} />}
            {selectedButtonId === "communityPost" && <CommunityPostPage posts={communityPosts} />}
            {selectedButtonId === "upcomingEvents" && <UpcomingEventsPage events={upcomingEvents} registeredEventIds={registeredEventIds} />}
            {selectedButtonId === "registeredEvents" && <RegisteredEventsPage events={registeredEvents} />}
        </div>
    );
}