<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assets extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image'
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
        if ($this->image) {
            $this->attributes['image'] = url('storage/' . $this->image);
        }
    }
}
