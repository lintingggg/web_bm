<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MarsBm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class MarsBmController extends Controller
{
    public function index(): Response
    {
        $marsBm = MarsBm::first();
        
        return Inertia::render('MarsBms/Index', [
            'marsBm' => $marsBm,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'lyrics' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'audio_file' => ['nullable', 'file', 'mimes:mp3,wav,ogg', 'max:20480'], // 20MB max
            'cover_file' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'], // 2MB max
        ]);

        $marsBm = MarsBm::first() ?? new MarsBm();
        $marsBm->title = $request->title;
        $marsBm->lyrics = $request->lyrics;
        $marsBm->is_active = $request->is_active ?? true;

        if ($request->hasFile('audio_file')) {
            if ($marsBm->audio_path) {
                Storage::disk('public')->delete($marsBm->audio_path);
            }
            $marsBm->audio_path = $request->file('audio_file')->store('mars-bm', 'public');
        }

        if ($request->hasFile('cover_file')) {
            if ($marsBm->cover_path) {
                Storage::disk('public')->delete($marsBm->cover_path);
            }
            $marsBm->cover_path = $request->file('cover_file')->store('mars-bm/covers', 'public');
        }

        $marsBm->save();

        return back()->with('success', 'Mars BM berhasil diperbarui.');
    }

    public function destroyAudio(MarsBm $marsBm): RedirectResponse
    {
        if ($marsBm->audio_path) {
            Storage::disk('public')->delete($marsBm->audio_path);
            $marsBm->audio_path = null;
            $marsBm->save();
        }
        return back()->with('success', 'File audio berhasil dihapus.');
    }

    public function destroyCover(MarsBm $marsBm): RedirectResponse
    {
        if ($marsBm->cover_path) {
            Storage::disk('public')->delete($marsBm->cover_path);
            $marsBm->cover_path = null;
            $marsBm->save();
        }
        return back()->with('success', 'File cover berhasil dihapus.');
    }
}
