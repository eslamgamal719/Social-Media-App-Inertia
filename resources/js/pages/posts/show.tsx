import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Comment, Post } from "@/types";
import { Deferred, usePoll } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
}

export default function postsShow({ post, comments }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentsCountRef = useRef(comments?.length ?? 0);
    const iAmWritingCommentRef = useRef(false);

    usePoll(3_000, {
        only: ["comments"],
    });

    const scrollToComments = () => {
        commentsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    useEffect(() => {
        // current length of comments
        const newCommentsCount = comments?.length ?? 0;
        // we have stored the previous length in commentsCountRef
        // compare them and show a toast if different
        if (
            newCommentsCount > commentsCountRef.current &&
            commentsCountRef.current > 0 &&
            !iAmWritingCommentRef.current
        ) {
            console.log(iAmWritingCommentRef.current);
            toast("New comment added!", {
                duration: 6_000,
                action: {
                    label: "View Comments",
                    onClick: scrollToComments,
                },
            });
        }
        // update the commentsCountRef to the current length of comments
        commentsCountRef.current = newCommentsCount;
        iAmWritingCommentRef.current = false;
    }, [comments]);

    const handleCommentAdded = () => {
        iAmWritingCommentRef.current = true;
        toast("Comment added successfully !", { position: "top-right" });
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                <Card className="rounded-none">
                    <CardHeader>
                        <CardTitle>{post.title}</CardTitle>
                        <CardDescription>
                            By {post.user?.name} on{" "}
                            {new Date(post.created_at).toLocaleDateString()}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-gray-600">{post.body}</p>
                    </CardContent>
                </Card>

                <CommentForm
                    postId={post.id}
                    onCommentAdded={handleCommentAdded}
                />

                <div ref={commentsSectionRef}>
                    <Deferred
                        data="comments"
                        fallback={<CommentList comments={comments} />}
                    >
                        <CommentList comments={comments} />
                    </Deferred>
                </div>
            </div>
        </AppLayout>
    );
}
