<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FlightbookingController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\HotelbookingController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TravelbookingController;
use App\Http\Controllers\TravelController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;



Route::get('/', [WelcomeController::class, 'index'])->name('home');

Route::controller(FlightController::class)->group(function () {
    Route::get('flights', 'index')->name('flight.list');
    Route::post('flights/search', 'search')->name('flight.search');
    Route::get('/flights-details/{id}', 'showFlightDetails')->name('flights.details');
});

Route::post('/flightbooking', [FlightbookingController::class, 'store'])->middleware('auth')->name('store.flightbooking');


Route::controller(HotelController::class)->group(function () {
    Route::get('/hotels', 'index')->name('hotel.list');
    Route::get('/hotel-details/{id}', 'show')->name('hotel.details');
});

Route::post('/hotelbooking', [HotelbookingController::class, 'store'])->middleware('auth')->name('store.hotelbooking');


Route::controller(TravelController::class)->group(function () {
    Route::get('/travels', 'getTravels')->name('travel.list');
    Route::get('/omra', 'getOmra')->name('omra.list');
    Route::get('/travel-details/{id}', 'show')->name('travel.details');
});

Route::post('/travelbooking', [TravelbookingController::class, 'store'])->middleware('auth')->name('store.travelbooking');


Route::controller(ContactController::class)->group(function () {
    Route::get('contact',  'index')->name('contact');
    Route::post('message', 'send')->name('message.send');
});


Route::controller(CommentController::class)->group(function () {
    Route::post('comment', 'store')->middleware(["auth"])->name("store.comment");
    Route::get('comments', 'show')->name("show.comments");
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__. '/admin.php';
require __DIR__ . '/auth.php';

