import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { Link } from "@inertiajs/react";

interface PostsIndexProps {
    posts: Post[]
}

export default function postsIndex({ posts }: PostsIndexProps) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
                {posts.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No posts found.</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <Card key={post.id} className="rounded-none border-b-0 last:border-b">
                            <CardHeader>
                                <CardTitle>
                                    <Link href={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription>By {post.user.name}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    {post.body.substring(0, 200)}
                                    {post.body.length > 200 && "..."}
                                </p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </AppLayout>
    );
}