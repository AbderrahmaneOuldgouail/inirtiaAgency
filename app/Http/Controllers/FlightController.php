<?php

namespace App\Http\Controllers;

use App\Enums\FlightClass;
use App\Http\Controllers\Controller;
use App\Models\flight;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FlightController extends Controller
{
    public function index(Request $request)
    {
        $flights = flight::where("diparture", '=', $request->diparture)
            ->where("arrival", '=', $request->arrival)->get();

        if ($flights->isEmpty()) {
            return Inertia::render('Flights', [
                'flights' => $flights,
                'flash' => [
                    'FlightsListMessage' => [
                        'status' => 'unseccess',
                        'message' => 'No flights to show',
                    ]
                ]
            ]);
        } else {
            return Inertia::render('Flights', [
                'flights' => $flights,
                'flash' => [
                    'FlightsListMessage' => [
                        'status' => 'success',
                        'message' => 'Aviable Flights',
                    ]
                ]
            ]);
        }
    }

    public function search(Request $request)
    {

        request()->validate(
            [
                'diparture' => 'required',
                'arrival' => 'required',
            ]
        );
        return redirect(route('flight.list', ['diparture' => $request->diparture, 'arrival' => $request->arrival]));
    }

    public function showFlightDetails(Request $request)
    {
        $flight = flight::all()->where('id', '=', $request->id)->first();
        return Inertia::render('FlightsDetails', ['flight' => $flight]);
    }

    public function showFlight()
    {
        $flights = flight::all();
        $classes = FlightClass::cases();

        return Inertia::render('Admin/Flights', ['flights' => $flights, 'classes' => $classes]);
    }


    public function store(Request $request)
    {
        request()->validate(
            [
                'diparture' => 'required|string',
                'arrival' => 'required|string',
                'default_price' => 'required|numeric',
                'class' => ['required', Rule::in(FlightClass::cases())],
            ]
        );

        flight::insert([
            'diparture' => $request->diparture,
            'arrival' => $request->arrival,
            'default_price' => $request->default_price,
            'class' => $request->class,
            'created_at' => now()
        ]);
        return redirect(Route('flight.index'))->with('message', [
            'status' => 'success',
            'message' => 'Flight created successfuly',
        ]);
    }

    public function edit(Request $request)
    {
        $flight = flight::get()->where('id', $request->id)->first();
        $classes = FlightClass::cases();

        return Inertia::render('Admin/EditFlight', ['flight' => $flight, 'classes' => $classes]);
    }


    public function update(Request $request)
    {
        request()->validate(
            [
                'diparture' => 'required|string',
                'arrival' => 'required|string',
                'default_price' => 'required|numeric',
                'class' => ['required', Rule::in(FlightClass::cases())],
            ]
        );

        flight::where('id', $request->id)->update(['diparture' => $request->diparture,
            'diparture' => $request->diparture,
            'arrival' => $request->arrival,
            'default_price' => $request->default_price,
            'class' => $request->class,
            'updated_at' => now()
        ]);

        return redirect(route('flight.edit', $request->id))->with('message', [
            'status' => 'success',
            'message' => 'Flight Updated successfuly',
        ]);
    }

    public function destroy(Request $request)
    {
        flight::where('id', $request->id)->delete();

        return redirect(route('flight.index',))->with('message', [
            'status' => 'success',
            'message' => 'Flight deleted successfuly',
        ]);
    }
}
