<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BmLogo;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BmLogoController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }

    public function index()
    {
        $logos = BmLogo::orderBy('created_at', 'desc')->get();
        
        $stats = [
            'total' => $logos->count(),
            'active' => $logos->where('is_active', true)->count(),
            'inactive' => $logos->where('is_active', false)->count(),
        ];

        return Inertia::render('BmLogos/Index', [
            'logos' => $logos,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'required|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $this->imageUploadService->storeOptimized(
                $request->file('image'), 
                'bm-logos',
                false
            );
        }

        BmLogo::create($validated);

        return redirect()->back()->with('success', 'Logo BM berhasil ditambahkan.');
    }

    public function update(Request $request, BmLogo $bmLogo)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($bmLogo->image && Storage::disk('public')->exists($bmLogo->image)) {
                Storage::disk('public')->delete($bmLogo->image);
            }
            
            $validated['image'] = $this->imageUploadService->storeOptimized(
                $request->file('image'), 
                'bm-logos',
                false
            );
        }

        $bmLogo->update($validated);

        return redirect()->back()->with('success', 'Logo BM berhasil diperbarui.');
    }

    public function destroy(BmLogo $bmLogo)
    {
        if ($bmLogo->image && Storage::disk('public')->exists($bmLogo->image)) {
            Storage::disk('public')->delete($bmLogo->image);
        }
        
        $bmLogo->delete();

        return redirect()->back()->with('success', 'Logo BM berhasil dihapus.');
    }
}
