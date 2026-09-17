<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MarsBm extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'audio_path',
        'cover_path',
        'lyrics',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
