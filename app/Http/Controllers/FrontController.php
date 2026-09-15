<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\HeroSection;
use App\Models\AboutSection;
use App\Models\Agenda;
use App\Models\Page;
use App\Models\Post;
use App\Models\SocialMediaPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function index()
    {
        $heroSections = HeroSection::where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->get();

        $aboutSection = AboutSection::where('is_active', true)
            ->orderByDesc('created_at')
            ->first();

        $activeAgendas = Agenda::where('is_active', true)
            ->where('date', '>=', now()->startOfMonth()) // fetch agendas from current month onwards, or all active
            ->orderBy('date', 'asc')
            ->get();

        // Group agendas by date "Y-m-d"
        $agendasByDate = [];
        foreach ($activeAgendas as $agenda) {
            $dateKey = $agenda->date->format('Y-m-d');
            if (!isset($agendasByDate[$dateKey])) {
                $agendasByDate[$dateKey] = [];
            }
            $agendasByDate[$dateKey][] = [
                'id' => $agenda->id,
                'title' => $agenda->title,
                'time' => $agenda->time,
                'location' => $agenda->location,
            ];
        }

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

        $socialMediaPosts = SocialMediaPost::where('is_active', true)
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->take(3)
            ->get();

        return Inertia::render('Front/Home', [
            'heroSections' => $heroSections,
            'aboutSection' => $aboutSection,
            'agendas' => (object)$agendasByDate,
            'latestPosts' => $latestPosts,
            'latestGalleries' => $latestGalleries,
            'socialMediaPosts' => $socialMediaPosts,
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

        $aboutSection = AboutSection::where('is_active', true)
            ->orderByDesc('created_at')
            ->first();

        return Inertia::render('Front/Profil/TentangKami', [
            'page' => $page,
            'aboutSection' => $aboutSection,
        ]);
    }

    public function strukturOrganisasi()
    {
        $page = Page::where('slug', 'struktur-organisasi')
            ->where('status', 'published')
            ->first();

        $structure = \App\Models\OrganizationStructure::where('is_active', true)
            ->orderByDesc('created_at')
            ->first();

        return Inertia::render('Front/Profil/StrukturOrganisasi', [
            'page' => $page,
            'structure' => $structure,
        ]);
    }

    public function logoBM()
    {
        $page = Page::where('slug', 'logo-bm')
            ->where('status', 'published')
            ->first();

        $logo = \App\Models\BmLogo::where('is_active', true)
            ->orderByDesc('created_at')
            ->first();

        return Inertia::render('Front/Profil/LogoBM', [
            'page' => $page,
            'logo' => $logo,
        ]);
    }
}
