import type { Poster, Commenter, Event } from '@/lib/types/types';

import { useRouter } from "next/navigation";
import { ButtonConfig } from '../button-type';
import { DisplayPostComponent } from '../display-post-component';
import { UpcomingEventComponent } from '../upcoming-event-component';
import HorizontalNavBar from '../horizontal-navigation-bar-component';

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


const ContentMagementPage = ( ) => {
    const router = useRouter();
    return (
        <div className="mt-3">
            <ContentMagementPage></ContentMagementPage>
        </div>
    );
}





export default function OfficersCard({ className, myButtons, selectedButtonId, onButtonSelect}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;
    const router = useRouter();

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "member" && <OfficialPostPage></OfficialPostPage>}
            {selectedButtonId === "content" && <ContentMagementPage></ContentMagementPage>}
        </div>
    );
}