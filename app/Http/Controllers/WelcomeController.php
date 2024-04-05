<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\hotel;
use App\Models\travel;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $travels = travel::with(['assets' => function ($query) {
            $query->take(1);
        }])->take(3)->get();
        $hotels = hotel::with(['assets' => function ($query) {
            $query->take(1); 
        }])->take(3)->get();
        return Inertia::render('Home', ['hotels' => $hotels, 'travels' => $travels]);
    }
}
