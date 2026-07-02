<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostToggleLike;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home.index');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about.index');

Route::post('/posts/{post}/likes/toggle', PostToggleLike::class);

Route::get('/auth/register', [RegisterController::class, 'create']);
Route::post('/auth/register', [RegisterController::class, 'store']);

Route::get('/auth/login', [LoginController::class, 'create']);
Route::post('/auth/login', [LoginController::class, 'store']);
Route::post('/auth/logout', [LoginController::class, 'destroy']);

//Posts
Route::get('/posts/create', [PostController::class, 'create']);
Route::post('/posts', [PostController::class, 'store']);
Route::get('posts', [PostController::class, 'index']);
Route::get('posts/{id}', [PostController::class, 'show']);
Route::post('/comments', [CommentController::class, 'store']);
