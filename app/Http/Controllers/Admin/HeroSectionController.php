<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSection;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class HeroSectionController extends Controller
{
    public function index(Request $request): Response
    {
        $heroSections = HeroSection::query()
            ->orderBy('sort_order')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(fn (HeroSection $hero): array => [
                'id' => $hero->id,
                'title' => $hero->title,
                'subtitle' => $hero->subtitle,
                'image_url' => $hero->image_url,
                'is_active' => $hero->is_active,
                'sort_order' => $hero->sort_order,
                'created_at' => $hero->created_at?->format('Y-m-d H:i'),
            ]);

        return Inertia::render('HeroSections/Index', [
            'heroSections' => $heroSections,
            'stats' => [
                'total' => HeroSection::count(),
                'active' => HeroSection::where('is_active', true)->count(),
                'inactive' => HeroSection::where('is_active', false)->count(),
            ],
        ]);
    }

    public function store(Request $request, ImageUploadService $imageService): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $imageService->storeOptimized(
                $request->file('image'),
                'hero-sections',
                false
            );
        }

        unset($validated['image']);
        HeroSection::create($validated);

        return back()->with('success', 'Banner Hero berhasil ditambahkan.');
    }

    public function update(
        Request $request,
        HeroSection $heroSection,
        ImageUploadService $imageService
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            if ($heroSection->image_path && Storage::disk('public')->exists($heroSection->image_path)) {
                Storage::disk('public')->delete($heroSection->image_path);
            }

            $validated['image_path'] = $imageService->storeOptimized(
                $request->file('image'),
                'hero-sections',
                false
            );
        }

        unset($validated['image']);
        $heroSection->update($validated);

        return back()->with('success', 'Banner Hero berhasil diperbarui.');
    }

    public function destroy(HeroSection $heroSection): RedirectResponse
    {
        if ($heroSection->image_path && Storage::disk('public')->exists($heroSection->image_path)) {
            Storage::disk('public')->delete($heroSection->image_path);
        }

        $heroSection->delete();

        return back()->with('success', 'Banner Hero berhasil dihapus.');
    }
}
