<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontController extends Controller
{
    public function index()
    {
        return Inertia::render('Front/Home');
    }

    public function artikel()
    {
        return Inertia::render('Front/Artikel');
    }

    public function artikelDetail($slug)
    {
        return Inertia::render('Front/ArtikelDetail', [
            'slug' => $slug
        ]);
    }

    public function galeri()
    {
        return Inertia::render('Front/GaleriIndex');
    }

    public function galeriDetail($slug)
    {
        return Inertia::render('Front/GaleriDetail', [
            'slug' => $slug
        ]);
    }

    public function tentangKami()
    {
        return Inertia::render('Front/Profil/TentangKami');
    }

    public function strukturOrganisasi()
    {
        return Inertia::render('Front/Profil/StrukturOrganisasi');
    }

    public function logoBM()
    {
        return Inertia::render('Front/Profil/LogoBM');
    }
}
