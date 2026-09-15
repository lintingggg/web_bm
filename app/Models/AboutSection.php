<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class AboutSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'title_line2',
        'description',
        'primary_image',
        'secondary_image',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected $appends = [
        'primary_image_url',
        'secondary_image_url',
    ];

    public function getPrimaryImageUrlAttribute(): ?string
    {
        return $this->primary_image ? asset('storage/' . $this->primary_image) : null;
    }

    public function getSecondaryImageUrlAttribute(): ?string
    {
        return $this->secondary_image ? asset('storage/' . $this->secondary_image) : null;
    }
}
