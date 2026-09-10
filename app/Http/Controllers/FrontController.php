<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function index()
    {
        $latestPosts = Post::with(['author', 'category'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->take(4)
            ->get();

        $latestGalleries = Gallery::where('is_active', true)
            ->orderByDesc('created_at')
            ->take(4)
            ->get();

        return Inertia::render('Front/Home', [
            'latestPosts' => $latestPosts,
            'latestGalleries' => $latestGalleries,
        ]);
    }

    public function artikel()
    {
        $posts = Post::with(['author', 'category', 'hashtags'])
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->paginate(12);

        return Inertia::render('Front/Artikel', [
            'posts' => $posts,
        ]);
    }

    public function artikelDetail($slug)
    {
        $post = Post::with(['author', 'category', 'hashtags'])
            ->where('slug', $slug)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->firstOrFail();

        // Increment views
        $post->increment('views_count');

        $relatedPosts = Post::with(['author', 'category'])
            ->where('category_id', $post->category_id)
            ->where('id', '!=', $post->id)
            ->where('status', 'published')
            ->where('published_at', '<=', now())
            ->orderByDesc('published_at')
            ->take(4)
            ->get();

        return Inertia::render('Front/ArtikelDetail', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
        ]);
    }

    public function galeri()
    {
        $galleries = Gallery::where('is_active', true)
            ->withCount('images')
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Front/GaleriIndex', [
            'galleries' => $galleries,
        ]);
    }

    public function galeriDetail($slug)
    {
        $gallery = Gallery::with('images')
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return Inertia::render('Front/GaleriDetail', [
            'gallery' => $gallery,
        ]);
    }

    public function tentangKami()
    {
        $page = Page::where('slug', 'tentang-kami')
            ->where('status', 'published')
            ->first();

        return Inertia::render('Front/Profil/TentangKami', [
            'page' => $page,
        ]);
    }

    public function strukturOrganisasi()
    {
        $page = Page::where('slug', 'struktur-organisasi')
            ->where('status', 'published')
            ->first();

        return Inertia::render('Front/Profil/StrukturOrganisasi', [
            'page' => $page,
        ]);
    }

    public function logoBM()
    {
        $page = Page::where('slug', 'logo-bm')
            ->where('status', 'published')
            ->first();

        return Inertia::render('Front/Profil/LogoBM', [
            'page' => $page,
        ]);
    }
}
