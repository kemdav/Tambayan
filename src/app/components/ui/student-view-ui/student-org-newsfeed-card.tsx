// app/components/ui/student-view-ui/student-org-newsfeed-card.tsx
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
// Removed Button, CommentComponent, CommentToOrgCard, UpcomingEventComponent as they are not used directly here
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster } from '@/lib/types/types'; // Only Poster needed here now
import { Tables } from "@/lib/database.types";
import { FaTrash } from 'react-icons/fa'; // Import a trash icon
import { deleteEvent } from '@/lib/actions/events'; // Import the new delete action
import { useRouter } from "next/navigation";
import { UpcomingEventComponent } from "../general/upcoming-event-component";
// Removed useState as it's not needed directly here anymore, only passed down
// Removed Commenter, Event as they are not used here

interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    canManageOrg: boolean;
    onButtonSelect: (id: string) => void;
    officialPosts: Poster[]; // New prop to receive official posts
    communityPosts: Poster[]; // New prop to receive community posts
    currentUserID?: string; // If you want edit/delete on org posts, pass this down
     upcomingEvents: EventWithOrg[];
}
type EventWithOrg = Tables<'events'> & {
    organizations: Pick<Tables<'organizations'>, 'orgname' | 'picture'> | null;
};
// OfficialPostPage now receives its posts as a prop
const OfficialPostPage = ({ posts,canManageOrg, currentUserID }: { posts: Poster[], canManageOrg: boolean, currentUserID?: string }) => {
    return (
        <div className="mt-3">
            {posts.length === 0 ? (<p>No official posts found for this organization.</p>) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <DisplayPostComponent
                            key={post.postID}
                            postID={post.postID}
                            posterName={post.posterName}
                            avatarSrc={post.posterPictureUrl}
                            title={post.title}
                            imageSrc={post.imageSrc}
                            posterUserID={post.posterUserID} // Important for edit/delete
                            daysSincePosted={post.daysSincePosted}
                            content={post.content}
                            likes={post.likes}
                            comments={post.comments}
                            canAdministerPost={canManageOrg}
                            recipient={post.recipient}
                            currentUserID={currentUserID} // Pass down to DisplayPostComponent
                            posterID={post.posterID} // Make sure this matches the prop in DisplayPostComponent
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

// CommunityPostPage now receives its posts as a prop
const CommunityPostPage = ({ posts, currentUserID }: { posts: Poster[], currentUserID?: string }) => {
    return (
        <div className="mt-3">
            {posts.length === 0 ? (<p>No community posts found for this organization.</p>) : (
                <ul className="space-y-4">
                    {posts.map((post) => (
                        <DisplayPostComponent
                            key={post.postID}
                            postID={post.postID}
                            posterName={post.posterName}
                            avatarSrc={post.posterPictureUrl}
                            title={post.title}
                            imageSrc={post.imageSrc}
                            posterUserID={post.posterUserID} // Important for edit/delete
                            daysSincePosted={post.daysSincePosted}
                            content={post.content}
                            likes={post.likes}
                            comments={post.comments}
                            recipient={post.recipient}
                            currentUserID={currentUserID} // Pass down to DisplayPostComponent
                            posterID={post.posterID} // Make sure this matches the prop in DisplayPostComponent
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}

const OrgUpcomingEventsPage = ({ events, canManageOrg }: { events: EventWithOrg[], canManageOrg: boolean }) => {
    const router = useRouter();

      const handleDelete = async (eventId: number, orgId: string | null) => {
        if (!orgId) {
            alert("Cannot delete: Organization ID is missing.");
            return;
        }
        if (!confirm("Are you sure you want to delete this event permanently?")) return;

        const result = await deleteEvent(eventId, orgId);
        if (result.error) {
            alert(result.error);
        }
        // The page will automatically refresh due to revalidatePath in the action.
    };

    return (
        <div className="mt-3">
            {events.length === 0 ? (<p>This organization has no upcoming events.</p>) : (
                <ul className="space-y-4">
                    {events.map((event) => (
                        <div key={event.eventid} className="relative">
                        <UpcomingEventComponent
                            key={event.eventid}
                            orgName={event.organizations?.orgname || 'Org'}
                            avatarSrc={event.organizations?.picture}
                            eventTitle={event.title || 'Event'}
                            eventDescription={event.description || ''}
                            eventDate={event.date}
                            eventLocation={event.location}
                            showButton={false}
                            buttonLabel="View Details"
                            // You could make this link to a future dedicated event page
                            onButtonClick={() => router.push(`/events/${event.eventid}`)}
                        />
                        {canManageOrg && (
                                <button
                                    onClick={() => handleDelete(event.eventid, event.orgid)}
                                    className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded-full transition-colors"
                                    aria-label="Delete event"
                                >
                                    <FaTrash size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default function StudentOrgNewsfeedCard({ className, myButtons, selectedButtonId,upcomingEvents = [], onButtonSelect, officialPosts, communityPosts, currentUserID, canManageOrg }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    
     console.log('[StudentOrgNewsfeedCard] Received upcomingEvents:', upcomingEvents);
    console.log('[StudentOrgNewsfeedCard] Current selectedButtonId:', selectedButtonId);

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "official" && <OfficialPostPage canManageOrg={canManageOrg} posts={officialPosts} currentUserID={currentUserID}></OfficialPostPage>}
            {selectedButtonId === "community" && <CommunityPostPage posts={communityPosts} currentUserID={currentUserID}></CommunityPostPage>}
            {selectedButtonId === "upcomingEvents" && <OrgUpcomingEventsPage events={upcomingEvents} canManageOrg={canManageOrg} />}
        </div>
    );
}