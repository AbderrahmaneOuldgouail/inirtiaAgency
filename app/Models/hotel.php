<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class hotel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'adresse',
        'rating',
        'descreption',
        'default_price',
        'created_at',
        'updated_at',
    ];

    public function assets()
    {
        return $this->hasMany(Assets::class);
    }


}
