// app/components/ui/student-view-ui/student-org-newsfeed-card.tsx
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
// Removed Button, CommentComponent, CommentToOrgCard, UpcomingEventComponent as they are not used directly here
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster } from '@/lib/types/types'; // Only Poster needed here now
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
}

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

export default function StudentOrgNewsfeedCard({ className, myButtons, selectedButtonId, onButtonSelect, officialPosts, communityPosts, currentUserID, canManageOrg }: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "official" && <OfficialPostPage canManageOrg={canManageOrg} posts={officialPosts} currentUserID={currentUserID}></OfficialPostPage>}
            {selectedButtonId === "community" && <CommunityPostPage posts={communityPosts} currentUserID={currentUserID}></CommunityPostPage>}
        </div>
    );
}