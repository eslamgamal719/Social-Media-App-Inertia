<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

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

    public function create(): Response {
        return Inertia::render('posts/create');
    }

    public function store(Request $request): RedirectResponse {
        $validated = $request->validate([
            'title' => 'required|string|min:3|max:255',
            'body' => 'required|string|min:10|max:255'
        ]);
        
        Post::create($validated);

        return redirect('/posts');
    }
}
