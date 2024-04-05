<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class agency extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'descreption',
        'email',
        'phone',
        'adresse',
        'localisation',
        'logo'
    ];

    protected static function boot()
    {
        parent::boot();

        static::retrieved(function ($assets) {
            $assets->getImageUrl();
        });
    }

    public function getImageUrl()
    {
        if ($this->logo) {
            $this->attributes['logo'] = url('storage/' . $this->logo);
        }
    }
}
