// app/components/ui/student-view-ui/student-comment-card.tsx
import Link from 'next/link';
import { differenceInDays, formatDistanceToNow } from 'date-fns';
import { StudentComment } from '@/lib/actions/comment'; // Import the type

interface StudentCommentCardProps {
    comment: StudentComment;
}

export default function StudentCommentCard({ comment }: StudentCommentCardProps) {
    if (!comment.post) {
        return (
            <div className="bg-white p-4 rounded-lg shadow-sm border">
                <p className="text-sm text-gray-500">This comment is on a post that has been deleted.</p>
                <p className="mt-2 text-gray-800 italic">"{comment.comment_text}"</p>
            </div>
        );
    }
    const daysAgo = comment.posted 
        ? differenceInDays(new Date(), new Date(comment.posted)) 
        : 0;

    const postLink = comment.post ? `/post/${comment.post.postid}` : '#';
    const postSubject = comment.post?.subject || "a deleted post";
    const searchQuery = encodeURIComponent(comment.post.subject || '');
    const searchUrl = `/search-posts?q=${searchQuery}`;

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-500 mb-2">
                You commented on the post:
                <Link href={searchUrl} legacyBehavior>
                    <a className="font-semibold text-blue-600 hover:underline ml-1">
                        "{comment.post.subject}"
                    </a>
                </Link>
            </p>
            <div className="border-l-4 border-gray-200 pl-4">
                <p className="text-gray-800 italic">"{comment.comment_text}"</p>
                <p className="text-xs text-gray-400 mt-2">
                    {formatDistanceToNow(new Date(comment.posted || Date.now()), { addSuffix: true })}
                </p>
            </div>
        </div>
    );
}