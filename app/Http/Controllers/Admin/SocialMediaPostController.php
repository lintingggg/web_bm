<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialMediaPost;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialMediaPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $posts = SocialMediaPost::query()
            ->orderBy('sort_order')
            ->latest()
            ->get()
            ->map(fn (SocialMediaPost $post): array => [
                'id' => $post->id,
                'platform' => $post->platform,
                'url' => $post->url,
                'is_active' => $post->is_active,
                'sort_order' => $post->sort_order,
                'created_at' => $post->created_at?->format('Y-m-d H:i'),
            ]);

        return Inertia::render('SocialMediaPosts/Index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'in:tiktok,instagram,youtube'],
            'url' => ['required', 'url', 'max:2000'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);

        SocialMediaPost::create($validated);

        return back()->with('success', 'Postingan sosial media berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SocialMediaPost $socialMediaPost): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => ['required', 'string', 'in:tiktok,instagram,youtube'],
            'url' => ['required', 'url', 'max:2000'],
            'is_active' => ['required', 'boolean'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
        ]);

        $validated['sort_order'] = (int) ($validated['sort_order'] ?? 0);

        $socialMediaPost->update($validated);

        return back()->with('success', 'Postingan sosial media berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SocialMediaPost $socialMediaPost): RedirectResponse
    {
        $socialMediaPost->delete();

        return back()->with('success', 'Postingan sosial media berhasil dihapus.');
    }
}
