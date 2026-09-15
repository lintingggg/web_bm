<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AboutSection;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AboutSectionController extends Controller
{
    public function index(): Response
    {
        $aboutSections = AboutSection::orderByDesc('created_at')->get();
        $activeCount = AboutSection::where('is_active', true)->count();
        $inactiveCount = AboutSection::where('is_active', false)->count();

        return Inertia::render('AboutSections/Index', [
            'aboutSections' => $aboutSections,
            'stats' => [
                'total' => $aboutSections->count(),
                'active' => $activeCount,
                'inactive' => $inactiveCount,
            ]
        ]);
    }

    public function store(Request $request, ImageUploadService $imageService): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_line2' => 'required|string|max:255',
            'description' => 'required|string',
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'secondary_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('primary_image')) {
            $validated['primary_image'] = $imageService->storeOptimized(
                $request->file('primary_image'),
                'about-sections',
                false
            );
        }

        if ($request->hasFile('secondary_image')) {
            $validated['secondary_image'] = $imageService->storeOptimized(
                $request->file('secondary_image'),
                'about-sections',
                false
            );
        }

        AboutSection::create($validated);

        return back()->with('success', 'About Section berhasil ditambahkan.');
    }

    public function update(
        Request $request,
        AboutSection $aboutSection,
        ImageUploadService $imageService
    ): RedirectResponse {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_line2' => 'required|string|max:255',
            'description' => 'required|string',
            'primary_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'secondary_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('primary_image')) {
            if ($aboutSection->primary_image && Storage::disk('public')->exists($aboutSection->primary_image)) {
                Storage::disk('public')->delete($aboutSection->primary_image);
            }

            $validated['primary_image'] = $imageService->storeOptimized(
                $request->file('primary_image'),
                'about-sections',
                false
            );
        } else {
            unset($validated['primary_image']);
        }

        if ($request->hasFile('secondary_image')) {
            if ($aboutSection->secondary_image && Storage::disk('public')->exists($aboutSection->secondary_image)) {
                Storage::disk('public')->delete($aboutSection->secondary_image);
            }

            $validated['secondary_image'] = $imageService->storeOptimized(
                $request->file('secondary_image'),
                'about-sections',
                false
            );
        } else {
            unset($validated['secondary_image']);
        }

        $aboutSection->update($validated);

        return back()->with('success', 'About Section berhasil diperbarui.');
    }

    public function destroy(AboutSection $aboutSection): RedirectResponse
    {
        if ($aboutSection->primary_image && Storage::disk('public')->exists($aboutSection->primary_image)) {
            Storage::disk('public')->delete($aboutSection->primary_image);
        }

        if ($aboutSection->secondary_image && Storage::disk('public')->exists($aboutSection->secondary_image)) {
            Storage::disk('public')->delete($aboutSection->secondary_image);
        }

        $aboutSection->delete();

        return back()->with('success', 'About Section berhasil dihapus.');
    }
}
