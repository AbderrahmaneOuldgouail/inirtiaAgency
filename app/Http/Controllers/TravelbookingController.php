<?php

namespace App\Http\Controllers;

use App\Enums\BookingStatus;
use App\Http\Controllers\Controller;
use App\Models\travelbooking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function PHPSTORM_META\type;

class TravelbookingController extends Controller
{
    private function calculateTotalPrice($price, $nb_people)
    {
        return $price * $nb_people;
    }

    public function store(Request $request)
    {
        request()->validate(
            [
                'nb_people' => 'required|integer',
            ]
        );
        travelbooking::insert([
            'user_id'  => Auth::id(),
            'travel_id' => $request->travel_id,
            'nb_people' => $request->nb_people,
            'status' => 'pending',
            'total_price' => $this->calculateTotalPrice($request->nb_people, $request->default_price),
            'created_at' => now()
        ]);
        return redirect(Route('travel.details', $request->travel_id))->with('message', ['TravelBookingMessage' => [
            'status' => 'success',
            'message' => 'Booked successfuly',
        ]]);
    }

    public function index(Request $request)
    {
        $bookings = DB::table('travelbookings')
            ->join('travel', 'travel.id', '=', 'travelbookings.travel_id')
            ->join('users', 'users.id', '=', 'travelbookings.user_id')
            ->where('travel.type', $request->type)
            ->select('travelbookings.*', 'travel.name', 'users.first_name')
            ->get();
        $bookingStatus = BookingStatus::cases();
        return Inertia::render('Admin/TravelBookings', ['bookings' => $bookings, 'status' => $bookingStatus, 'type' => $request->type]);
    }

    public function update(Request $request)
    {
        travelbooking::where('id', $request->id)->update([
            'status' => $request->status,
            'updated_at' => now()
        ]);
        return redirect(route('travelBookings.index', $request->type))->with('message', [
            'status' => 'success',
            'message' => 'Updated Successfuly'
        ]);
    }
}
