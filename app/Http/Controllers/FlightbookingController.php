<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\flightbooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FlightbookingController extends Controller
{

    private function calculateTotalPrice($nb_people, $default_price)
    {
        return $nb_people * $default_price;
    }

    public function store(Request $request)
    {
        request()->validate(
            [
                'nb_people' => 'required|integer',
            ]
        );

        flightbooking::insert([
            'user_id'  => Auth::id(),
            'flight_id' => $request->flight_id,
            'nb_people' => $request->nb_people,
            'status' => 'pending',
            'total_price' => $this->calculateTotalPrice($request->nb_people, $request->default_price),
            'created_at' => now()
        ]);
        return redirect(Route("flights.details", $request->flight_id))->with('message', [
            ['FlightBookingMessage' => [
                'status' => 'success',
                'message' => 'Booked successfuly',
            ]]
        ]);
    }

    public function index()
    {
        $bookings = DB::table('flightbookings')
            ->join('flights', 'flights.id', '=', 'flightbookings.flight_id')
            ->join('users', 'users.id', '=', 'flightbookings.user_id')
            ->select('flightbookings.*','flights.diparture', 'flights.arrival', 'flights.class', 'users.first_name')
            ->get();
        $bookingStatus = BookingStatus::cases();
        return Inertia::render('Admin/FlightBookings', ['bookings' => $bookings, 'status' => $bookingStatus]);
    }

    public function update(Request $request)
    {
        flightbooking::where('id', $request->id)->update([
            'status' => $request->status,
            'updated_at' => now()
        ]);
        return redirect(route('flightBookings.index'))->with('message', [
            'status' => 'success',
            'message' => 'Updated Successfuly'
        ]);
    }
}
