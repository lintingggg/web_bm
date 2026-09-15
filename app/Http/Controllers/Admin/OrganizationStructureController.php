<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrganizationStructure;
use App\Services\ImageUploadService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class OrganizationStructureController extends Controller
{
    protected $imageUploadService;

    public function __construct(ImageUploadService $imageUploadService)
    {
        $this->imageUploadService = $imageUploadService;
    }

    public function index()
    {
        $structures = OrganizationStructure::orderBy('created_at', 'desc')->get();
        
        $stats = [
            'total' => $structures->count(),
            'active' => $structures->where('is_active', true)->count(),
            'inactive' => $structures->where('is_active', false)->count(),
        ];

        return Inertia::render('OrganizationStructures/Index', [
            'structures' => $structures,
            'stats' => $stats
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'periode' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $this->imageUploadService->storeOptimized(
                $request->file('image'), 
                'organization-structures',
                false
            );
        }

        OrganizationStructure::create($validated);

        return redirect()->back()->with('success', 'Struktur organisasi berhasil ditambahkan.');
    }

    public function update(Request $request, OrganizationStructure $organizationStructure)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'periode' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($organizationStructure->image && Storage::disk('public')->exists($organizationStructure->image)) {
                Storage::disk('public')->delete($organizationStructure->image);
            }
            
            $validated['image'] = $this->imageUploadService->storeOptimized(
                $request->file('image'), 
                'organization-structures',
                false
            );
        }

        $organizationStructure->update($validated);

        return redirect()->back()->with('success', 'Struktur organisasi berhasil diperbarui.');
    }

    public function destroy(OrganizationStructure $organizationStructure)
    {
        if ($organizationStructure->image && Storage::disk('public')->exists($organizationStructure->image)) {
            Storage::disk('public')->delete($organizationStructure->image);
        }
        
        $organizationStructure->delete();

        return redirect()->back()->with('success', 'Struktur organisasi berhasil dihapus.');
    }
}
