<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Inertia\Response;

class PostController extends Controller
{
    public function index() : Response
    {
        $posts = Post::latest()->get();

        return Inertia::render('posts/index', [
            'posts' => $posts
        ]);       
    }

    public function show(string $id) : Response
    {
        $post = Post::findOrFail($id);

        return Inertia::render('posts/show', [
            'post' => $post
        ]);       
    }
}
