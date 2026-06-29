import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import CommentList from "@/components/comment-list";
import LikeButton from "@/components/like-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Comment, Post, PostLikesData } from "@/types";
import { Deferred, usePoll } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface PostsShowProps {
    post: Post;
    comments: Comment[];
    likes: PostLikesData;
}

export default function postsShow({ post, comments, likes }: PostsShowProps) {
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const commentsCountRef = useRef(comments?.length ?? 0);
    const iAmWritingCommentRef = useRef(false);

    usePoll(3_000, {
        only: ["comments", "likes"],
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
                    <CardContent className="space-y-4">
                        <p className="text-gray-700 whitespace-pre-wrap">
                            {post.body}
                        </p>
                        <Deferred
                            data="likes"
                            fallback={
                                <LikeButton
                                    postId={post.id}
                                    count={likes?.count}
                                    liked={likes?.user_has_liked}
                                    isLoading={!likes}
                                />
                            }
                        >
                            <LikeButton
                                postId={post.id}
                                count={likes?.count}
                                liked={likes?.user_has_liked}
                            />
                        </Deferred>
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
