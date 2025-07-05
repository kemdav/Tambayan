
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster, Commenter, Event } from '@/lib/types/types';
import { CommentComponent } from "../general/comment-component";
import CommentToOrgCard from "../general/comment-toOrg-card";
import { UpcomingEventComponent } from "../general/upcoming-event-component";

interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
}

export const OfficalPosts: Poster[] = [
    {
        postID:"1942",
         posterID:"123456787",
        posterName:"ICPEP",
        daysSincePosted:3,
        content:"This is my fifth post",
        likes:3,
        comments:3,
    },
    {
        postID:"2343",
         posterID:"123456787",
        posterName:"ICPEP",
        daysSincePosted:4,
        content:"This is my fourth post",
        likes:3,
        comments:3,
    },
    {
        postID:"5742",
         posterID:"123456787",
        posterName:"ICPEP",
        daysSincePosted:6,
        content:"This is my third post",
        likes:3,
        comments:3,
    },
    {
        postID:"2341",
         posterID:"123456787",
        posterName:"ICPEP",
        daysSincePosted:8,
        content:"This is my second post",
        likes:3,
        comments:3,
    },
    {
        postID:"572142",
         posterID:"123456787",
        posterName:"ICPEP",
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
                        comments={OfficalPosts.comments}
                        onAvatarClicked={()=>console.log("Test")}/>
                    ))}
                </ul>
            )}
        </div>
    );
}


export const CommunityPost: Poster[] = [
    {
        postID:"1942",
        posterName:"Excel Duran",
        daysSincePosted:3,
         posterID:"123456787",
        content:"This is my fifth post",
        likes:3,
        comments:3,
    },
    {
        postID:"2343",
        posterName:"Kem David",
        daysSincePosted:4,
         posterID:"123456787",
        content:"This is my fourth post",
        likes:3,
        comments:3,
    },
    {
        postID:"5742",
        posterName:"Gihun",
        daysSincePosted:6,
         posterID:"123456787",
        content:"This is my third post",
        likes:3,
        comments:3,
    },
    {
        postID:"2341",
        posterName:"Steve",
         posterID:"123456787",
        daysSincePosted:8,
        content:"This is my second post",
        likes:3,
        comments:3,
    },
    {
        postID:"572142",
        posterName:"Monkey D. Luffy",
         posterID:"123456787",
        daysSincePosted:10,
        content:"First Post",
        likes:3,
        comments:3,
    }
  ];


const CommunityPostPage = () => {
    return (
        <div className="mt-3">
            {CommunityPost.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {CommunityPost.map((CommunityPost) => (
                        <DisplayPostComponent key={CommunityPost.postID} posterName={CommunityPost.posterName}
                        daysSincePosted={CommunityPost.daysSincePosted}
                        content={CommunityPost.content}
                        likes={CommunityPost.likes}
                        comments={CommunityPost.comments}/>
                    ))}
                </ul>
            )}
        </div>
    );
}





export default function StudentOrgNewsfeedCard({ className, myButtons, selectedButtonId, onButtonSelect}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "official" && <OfficialPostPage></OfficialPostPage>}
            {selectedButtonId === "community" && <CommunityPostPage></CommunityPostPage>}
        </div>
    );
}