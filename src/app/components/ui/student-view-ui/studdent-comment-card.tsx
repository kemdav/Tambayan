// app/components/ui/student-view-ui/student-comment-card.tsx
import Link from 'next/link';
import { differenceInDays } from 'date-fns';
import { StudentComment } from '@/lib/actions/comment'; // Import the type

interface StudentCommentCardProps {
    comment: StudentComment;
}

export default function StudentCommentCard({ comment }: StudentCommentCardProps) {
    const daysAgo = comment.posted 
        ? differenceInDays(new Date(), new Date(comment.posted)) 
        : 0;

    const postLink = comment.post ? `/post/${comment.post.postid}` : '#';
    const postSubject = comment.post?.subject || "a deleted post";

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">
                You commented on the post:
                <Link href={`/post/${comment.post?.postid}`} className="ml-1 font-semibold text-action-forest-green hover:underline">
                    {comment.post?.subject || "a post"}
                </Link>
                {comment.posted && <span className="ml-2 text-xs">({daysAgo} days ago)</span>}
            </p>
            <blockquote className="border-l-4 border-secondary-pale-sage pl-4 italic">
                <p className="text-gray-800">{comment.comment}</p>
            </blockquote>
        </div>
    );
}