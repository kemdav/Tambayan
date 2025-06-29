
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster, Commenter } from '@/lib/types/types';
import { CommentComponent } from "../general/comment-component";
import CommentToOrgCard from "../general/comment-toOrg-card";

interface Props {
    className?: string;
    myButtons: ButtonConfig[];
    selectedButtonId: string;
    onButtonSelect: (id: string) => void;
}

export const Posts: Poster[] = [
    {
        postID:"1942",
        posterName:"Excel Duran",
        daysSincePosted:3,
        content:"This is my fifth post",
        likes:3,
        comments:3,
    },
    {
        postID:"2343",
        posterName:"Excel Duran",
        daysSincePosted:4,
        content:"This is my fourth post",
        likes:3,
        comments:3,
    },
    {
        postID:"5742",
        posterName:"Excel Duran",
        daysSincePosted:6,
        content:"This is my third post",
        likes:3,
        comments:3,
    },
    {
        postID:"2341",
        posterName:"Excel Duran",
        daysSincePosted:8,
        content:"This is my second post",
        likes:3,
        comments:3,
    },
    {
        postID:"572142",
        posterName:"Excel Duran",
        daysSincePosted:10,
        content:"This is my first post",
        likes:3,
        comments:3,
    }
  ];


const PostPage = () => {
    return (
        <div className="mt-3">
            {Posts.length === 0 ? (<p>No users found</p>) : (
                <ul className="space-y-4">
                    {Posts.map((Posts) => (
                        <DisplayPostComponent key={Posts.postID} posterName={Posts.posterName}
                        daysSincePosted={Posts.daysSincePosted}
                        content={Posts.content}
                        likes={Posts.likes}
                        comments={Posts.comments}/>
                    ))}
                </ul>
            )}
        </div>
    );
}



export default function StudentNewsfeedCard({ className, myButtons, selectedButtonId, onButtonSelect}: Props) {
    const combinedClassName = `flex flex-col ${className || ''}`;

    return (
        <div className={combinedClassName}>
            <HorizontalNavBar myButtons={myButtons} selectedButtonId={selectedButtonId} onButtonSelect={onButtonSelect}></HorizontalNavBar>
            {selectedButtonId === "officialPost" && <PostPage></PostPage>}
        </div>
    );
}