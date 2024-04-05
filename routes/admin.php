<?php

use App\Http\Controllers\AgencyController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConditionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\FlightbookingController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\HotelbookingController;
use App\Http\Controllers\HotelController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TravelbookingController;
use App\Http\Controllers\TravelController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\UserIsAdmin;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::prefix('dashboard')->middleware(['auth', 'verified', UserIsAdmin::class])->group(function () {
  Route::get('/', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  Route::prefix('hotel')->controller(HotelController::class)->as('hotel.')->group(function () {
    Route::get('/', 'showHotel')->name('index');
    Route::post('/create', 'store')->name('store');
    Route::get('/edit/{id}', 'edit')->name('edit');
    Route::post('/edit', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });

  Route::prefix('travel')->controller(TravelController::class)->as('travel.')->group(function () {
    Route::get('/{type}', 'showTravel')->name('index');
    Route::post('/create', 'store')->name('store');
    Route::get('/edit/{id}', 'edit')->name('edit');
    Route::post('/edit', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });

  Route::prefix('flight')->controller(FlightController::class)->as('flight.')->group(function () {
    Route::get('/', 'showFlight')->name('index');
    Route::post('/create', 'store')->name('store');
    Route::get('/edit/{id}', 'edit')->name('edit');
    Route::post('/edit', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });

  Route::prefix('hotel-booking')->controller(HotelbookingController::class)->as('hotelBookings.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/edit', 'update')->name('update');
  });

  Route::prefix('flight-booking')->controller(FlightbookingController::class)->as('flightBookings.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::post('/edit', 'update')->name('update');
  });

  Route::controller(TravelbookingController::class)->as('travelBookings.')->group(function () {
    Route::get('/{type}-booking', 'index')->name('index');
    Route::post('/edit', 'update')->name('update');
  });

  Route::prefix('contact')->controller(ContactController::class)->as('contact.')->group(function () {
    Route::get('/', 'showContacts')->name('index');
    Route::post('/replay', 'replay')->name('replay');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });

  Route::prefix('agency')->controller(AgencyController::class)->as('agency.')->group(function () {
    route::get('/', 'index')->name('index');
    route::post('/create', 'store')->name('store');
    route::post('/update', 'update')->name('update');
  });

  Route::prefix('/agency/faq')->controller(FaqController::class)->as('faq.')->group(function () {
    route::get('/', 'index')->name('index');
    route::post('/create', 'store')->name('store');
    route::post('/update', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });
  
  Route::prefix('/agency/conditions')->controller(ConditionController::class)->as('conditions.')->group(function () {
    route::get('/', 'index')->name('index');
    route::post('/create', 'store')->name('store');
    route::post('/update', 'update')->name('update');
    Route::delete('/destroy/{id}', 'destroy')->name('destroy');
  });
});
