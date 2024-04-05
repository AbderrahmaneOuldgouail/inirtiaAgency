<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class travel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'default_price',
        'type',
        'distance'
    ];

    public function assets()
    {
        return $this->hasMany(Assets::class);
    }
}
