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
    {
        postID:"1942",
        posterName:"ICPEP",
         posterID:"123456787",
        daysSincePosted:3,
        content:"This is my fifth post",
        likes:3,
        comments:3,
    },
    {
        postID:"2343",
        posterName:"CE",
         posterID:"123456787",
        daysSincePosted:4,
        content:"This is my fourth post",
        likes:3,
        comments:3,
    },
    {
        postID:"5742",
         posterID:"123456787",
        posterName:"DOST",
        daysSincePosted:6,
        content:"This is my third post",
        likes:3,
        comments:3,
    },
    {
        postID:"2341",
         posterID:"123456787",
        posterName:"SSG",
        daysSincePosted:8,
        content:"This is my second post",
        likes:3,
        comments:3,
    },
    {
        postID:"572142",
         posterID:"123456787",
        posterName:"Honor Society",
        daysSincePosted:10,
        content:"This is my first post",
        likes:3,
        comments:3,
    }
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
    {
        postID:"1942",
        posterID:"123456787",
        posterName:"Excel Duran",
        daysSincePosted:3,
        content:"This is my fifth post",
        likes:3,
        comments:3,
    },
    {
        postID:"2343",
         posterID:"123456787",
        posterName:"Kem David",
        daysSincePosted:4,
        content:"This is my fourth post",
        likes:3,
        comments:3,
    },
    {
        postID:"5742",
         posterID:"123456787",
        posterName:"Gihun",
        daysSincePosted:6,
        content:"This is my third post",
        likes:3,
        comments:3,
    },
    {
        postID:"2341",
         posterID:"123456787",
        posterName:"Steve",
        daysSincePosted:8,
        content:"This is my second post",
        likes:3,
        comments:3,
    },
    {
        postID:"572142",
         posterID:"123456787",
        posterName:"Monkey D. Luffy",
        daysSincePosted:10,
        content:"This is my first post",
        likes:3,
        comments:3,
    }
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