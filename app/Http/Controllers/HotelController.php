<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Assets;
use App\Models\hotel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HotelController extends Controller
{
    public function index()
    {
        $hotels = hotel::with('assets')->get();

        return Inertia::render('Hotel', ['hotels' => $hotels]);
    }


    public function show(Request  $request)
    {
        $hotel = hotel::with('assets')->find($request->id);
        return  Inertia::render('HotelDetails', ['hotel' => $hotel]);
    }


    public function showHotel()
    {
        $hotels = hotel::with('assets')->get();
        return Inertia::render('Admin/Hotels', ['hotels' => $hotels]);
    }


    public function store(Request $request)
    {
        request()->validate(
            [
                'name' => 'required|string',
                'adresse' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'descreption' => 'required|string',
                'default_price' => 'required|numeric',
                'assets' => 'required|array|max:5'
            ]
        );
        $hotelId = hotel::insertGetId([
            'name' => $request->name,
            'adresse' => $request->adresse,
            'rating' => $request->rating,
            'descreption' => $request->descreption,
            'default_price' => $request->default_price,
            'created_at' => now()
        ]);
        foreach ($request->file('assets') as $key => $value) {
            $filename = $value->store('hotel', 'public');
            Assets::insert([
                'name' => "hotel-$request->name-img-$key",
                'image' => $filename,
                'hotel_id' => $hotelId,
                'created_at' => now(),
            ]);
        }

        return redirect(Route('hotel.index'))->with('message', [
            'status' => 'success',
            'message' => 'Hotel created successfuly',
        ]);
    }

    public function edit(Request $request)
    {
        $hotel = hotel::with('assets')->find($request->id);
        return Inertia::render('Admin/EditHotel', ['hotel' => $hotel]);
    }

    public function update(Request $request)
    {
        request()->validate(
            [
                'name' => 'required|string',
                'adresse' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'descreption' => 'required|string',
                'default_price' => 'required|numeric',
                'assets' => 'required|array'
            ]
        );

        hotel::where('id', $request->id)->update([
            'name' => $request->name,
            'adresse' => $request->adresse,
            'rating' => $request->rating,
            'descreption' => $request->descreption,
            'default_price' => $request->default_price,
            'updated_at' => now()
        ]);

        $images = Assets::where('hotel_id', $request->id)->get();
        foreach ($images as $key => $value) {
            Storage::disk('public')->delete($value->image);
            $value->delete();
        }

        foreach ($request->file('assets') as $key => $value) {
            $filename = $value->store('hotel', 'public');
            Assets::insert([
                'name' => "hotel-$request->name-img-$key",
                'image' => $filename,
                'hotel_id' => $request->id,
                'created_at' => now(),
            ]);
        }

        // Cache::put()

        return redirect(route('hotel.edit', $request->id))->with('message', [
            'status' => 'success',
            'message' => 'Hotel Updated successfuly',
        ]);
    }

    public function destroy(Request $request)
    {
        $images = Assets::where('hotel_id', $request->id)->get();
        foreach ($images as $value) {
            Storage::disk('public')->delete($value->image);
            $value->delete();
        }
        hotel::where('id', $request->id)->delete();
        return redirect(route('hotel.index',))->with('message', [
            'status' => 'success',
            'message' => 'Hotel deleted successfuly',
        ]);
    }
}
