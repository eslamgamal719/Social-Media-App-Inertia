import CommentCard from "@/components/comment-card";
import CommentForm from "@/components/comment-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Post } from "@/types";

interface PostsShowProps {
    post: Post;
}

export default function postsShow({ post }: PostsShowProps) {
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

                <CommentForm postId={post.id} />

                <div className="space-y-4">
                    {post.comments && post.comments.length > 0 ? (
                        <div>
                            {post.comments.map((comment) => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No comments yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
