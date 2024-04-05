<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\hotelbooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class HotelbookingController extends Controller
{

    private function calculateTotalPrice($nb_people, $default_price)
    {
        return $nb_people * $default_price;
    }

    public function store(Request $request)
    {
        request()->validate(
            [
                'check_in' => 'required|date',
                'check_out' => 'required|date|after:check_in',
                'nb_people' => 'required|integer',
            ]
        );

        hotelbooking::insert([
            'user_id'  => Auth::id(),
            'hotel_id' => $request->hotel_id,
            'check_in' => $request->check_in,
            'check_out' => $request->check_out,
            'nb_people' => $request->nb_people,
            'status' => 'pending',
            'total_price' => $this->calculateTotalPrice($request->nb_people, $request->default_price),
            'created_at' => now()
        ]);
        return redirect(Route('hotel.details', $request->hotel_id))->with('message', [
            'status' => 'success',
            'message' => 'Booked successfuly',
        ]);
    }

    public function index()
    {
        $bookings = DB::table('hotelbookings')
            ->join('hotels', 'hotels.id', '=', 'hotelbookings.hotel_id')
            ->join('users', 'users.id' ,'=', 'hotelbookings.user_id')
            ->select('hotelbookings.*', 'hotels.name', 'users.first_name')
            ->get();
        $bookingStatus = BookingStatus::cases();
        return Inertia::render('Admin/HotelBookings', ['bookings' => $bookings, 'status' => $bookingStatus]);
    }

    public function update(Request $request){
        hotelbooking::where('id', $request->id)->update([
            'status' => $request->status,
            'updated_at' => now()
        ]);
        return redirect(route('hotelBookings.index'))->with('message', [
            'status' => 'success',
            'message' => 'Updated Successfuly'
        ]);
    }
}
