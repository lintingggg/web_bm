<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AgendaController extends Controller
{
    public function index(): Response
    {
        $agendas = Agenda::orderBy('date', 'desc')->get();

        return Inertia::render('Agendas/Index', [
            'agendas' => $agendas,
            'stats' => [
                'total' => $agendas->count(),
                'active' => Agenda::where('is_active', true)->count(),
                'inactive' => Agenda::where('is_active', false)->count(),
            ]
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        Agenda::create($validated);

        return back()->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function update(Request $request, Agenda $agenda): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date' => 'required|date',
            'time' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'is_active' => 'boolean',
        ]);

        $agenda->update($validated);

        return back()->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(Agenda $agenda): RedirectResponse
    {
        $agenda->delete();

        return back()->with('success', 'Agenda berhasil dihapus.');
    }
}
