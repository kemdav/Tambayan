
import HorizontalNavBar from "../general/horizontal-navigation-bar-component";
import { ButtonConfig } from "../general/button-type";
import { Button } from "../general/button";
import { DisplayPostComponent } from "../general/display-post-component";
import type { Poster, Commenter } from '@/lib/types/types';
import { CommentComponent } from "../general/comment-component";
import CommentToOrgCard from "../general/comment-toOrg-card";
import { UpcomingEventComponent } from "../general/upcoming-event-component";
import UpcomingorgEventComponent from "../general/upcomingorg-event-component";
import DropDownRole from "../general/dropdown/dropdown-role";
import { StudentComment } from "@/lib/actions/comment";
import StudentCommentCard from "./studdent-comment-card";
import { StudentProfile } from "@/lib/types/database";
import EditAboutModal from "./edit-about-modal";
import { useState, useMemo } from "react"; 


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
        <div className="mt-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Section 1: Core Academic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Academic Information</h3>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Student ID:</span>
                        <span className="text-gray-800">{studentId}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Major:</span>
                        <span className="text-gray-800">{studentCourse || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Year Level:</span>
                        <span className="text-gray-800">{studentYear || 'N/A'}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Email:</span>
                        <span className="text-gray-800">{studentEmail || 'N/A'}</span>
                    </div>
                </div>

                {/* Section 2: Community & Activity Stats */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Community Stats</h3>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Joined Tambayan:</span>
                        <span className="text-gray-800">{studentJoinDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Events Joined:</span>
                        <span className="text-gray-800">{studentEventsJoined || '0'} events</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-gray-600">Organizations Joined:</span>
                        <span className="text-gray-800">{studentTotalOrg || '0'}</span>
                    </div>
                </div>

                {/* Section 3: Description (Spans full width) */}
                <div className="md:col-span-2 mt-4">
                    <div className="flex items-center justify-between border-b pb-2 mb-4">
                         <h3 className="text-lg font-semibold text-gray-800">Description</h3>
                         {isOwnProfile && (
                             <Button 
                                 onClick={onEditClick} 
                                 className="bg-green-100 text-green-800 hover:bg-green-200 text-sm font-medium py-1 px-3 rounded-md"
                             >
                                 Edit
                             </Button>
                         )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                        {aboutText || "This user hasn't added a description yet."}
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
const PostPage = ({ 
    posts, 
    currentUserID, 
    sortOption, 
    onSortChange,
    orgFilterOptions,
    onOrgFilterChange,
    filterPlaceholder
}: { 
    posts: Poster[], 
    currentUserID: string,
    sortOption: string,
    onSortChange: (option: string) => void,
    orgFilterOptions: { value: string, label: string }[],
    onOrgFilterChange: (orgName: string) => void,
    filterPlaceholder: string
}) => {
    console.log("PostPage received posts:", posts);
    console.log("PostPage received currentUserID:", currentUserID);
    return (
        <div className="mt-3">
            <div className="mb-3">
                <DropDownRole
                    options={orgFilterOptions}
                    placeholder={filterPlaceholder}
                    width="w-64"
                    onSelect={onOrgFilterChange}
                />
                {/* --- SORTING DROPDOWN --- */}
                <DropDownRole
                    options={options}
                    placeholder={options.find(o => o.value === sortOption)?.label || "Most Recent"}
                    width="w-xs"
                    onSelect={onSortChange}
                />
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
    const [sortOption, setSortOption] = useState("recent")
     const [filterOrgName, setFilterOrgName] = useState<string | null>(null); // null = "All Posts"

    const handleSaveAbout = (newAboutText: string) => {
        onProfileUpdate({ about: newAboutText });
    };

    const sortedPosts = useMemo(() => {
        const postsCopy = [...posts]; // Create a copy to avoid mutating the original prop
        switch (sortOption) {
            case 'oldest':
                // The 'posted' field would be best for this, assuming it exists
                // For now, we'll sort by daysSincePosted
                return postsCopy.sort((a, b) => b.daysSincePosted - a.daysSincePosted);
            case 'mostLikedAllTime':
                return postsCopy.sort((a, b) => b.likes - a.likes);
            case 'recent':
            default:
                // Default sort is recent
                return postsCopy.sort((a, b) => a.daysSincePosted - b.daysSincePosted);
        }
    }, [posts, sortOption]);

    const orgFilterOptions = useMemo(() => {
        const orgs = new Map<string, string>();
        posts.forEach(p => {
            // Only add if the post has a recipient (organization name)
            if (p.recipient && p.recipient !== 'Direct Post') {
                orgs.set(p.recipient, p.recipient);
            }
        });
        const options = Array.from(orgs.keys()).map(orgName => ({
            value: orgName,
            label: orgName
        }));
        // Add the "All" option to the start of the list
        return [{ value: 'all', label: 'All My Posts' }, ...options];
    }, [posts]);

    const processedPosts = useMemo(() => {
        // 1. Filter first
        const filtered = filterOrgName 
            ? posts.filter(p => p.recipient === filterOrgName)
            : posts;

        // 2. Then sort the filtered results
        const sorted = [...filtered]; // Create a mutable copy
        switch (sortOption) {
            case 'oldest':
                return sorted.sort((a, b) => b.daysSincePosted - a.daysSincePosted);
            case 'mostLikedAllTime':
                return sorted.sort((a, b) => b.likes - a.likes);
            case 'recent':
            default:
                return sorted.sort((a, b) => a.daysSincePosted - b.daysSincePosted);
        }
    }, [posts, sortOption, filterOrgName]);

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
                 {selectedButtonId === "post" && (
                    <PostPage 
                        posts={processedPosts} // <-- Pass the final processed list
                        currentUserID={currentUserID}
                        sortOption={sortOption}
                        onSortChange={setSortOption}
                        // Pass down the org filter props
                        orgFilterOptions={orgFilterOptions}
                        onOrgFilterChange={(value) => setFilterOrgName(value === 'all' ? null : value)}
                        filterPlaceholder={filterOrgName || 'All My Posts'}
                    />
                )}
                {selectedButtonId === "comment" && <CommentPage comments={initialComments} />}
            </div>
        </>
    );
}