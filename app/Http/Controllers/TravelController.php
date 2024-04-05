<?php

namespace App\Http\Controllers;

use App\Enums\TravelType;
use App\Http\Controllers\Controller;
use App\Models\Assets;
use App\Models\comment;
use App\Models\travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TravelController extends Controller
{

    public function getTravels()
    {
        $travels = travel::with('assets')->where('type',  TravelType::Travel)->get();
        return Inertia::render('Travels', ['travels' => $travels]);
    }

    public function getOmra()
    {
        $omras = travel::with('assets')->where('type',  TravelType::Omra)->get();
        return Inertia::render('Omra', ['omras' => $omras]);
    }

    public function show(Request $request)
    {
        $comments = DB::table('comments')
            ->join('users', 'users.id', '=', 'comments.user_id')
            ->select('comments.*', 'users.first_name', 'users.last_name')
            ->where('travel_id', $request->id)->orderByDesc('created_at')
            ->get();
        $travel = travel::with('assets')->find($request->id);

        return Inertia::render('TravelDetails', ['travel' => $travel, 'comments' => $comments]);
    }

    public function showTravel(Request $request)
    {
        $travels = travel::with('assets')->where('type', $request->type)->get();

        return Inertia::render('Admin/Travel', ['travels' => $travels, 'type' => $request->type]);
    }


    public function store(Request $request)
    {

        if ($request->type == TravelType::Travel->value) {
            request()->validate(
                [
                    'name' => 'required|string',
                    'default_price' => 'required|numeric',
                    'description' => 'required|string',
                    'assets' => 'required|array|max:5'
                ]
            );
            $travel_id = travel::insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'default_price' => $request->default_price,
                'type' => TravelType::Travel,
                'created_at' => now()
            ]);
            foreach ($request->file('assets') as $key => $value) {
                $filename = $value->store('travel', 'public');
                Assets::insert([
                    'name' => "travel-$request->name-img-$key",
                    'image' => $filename,
                    'travel_id' => $travel_id,
                    'created_at' => now(),
                ]);
            }

            return redirect(Route('travel.index', ['type' => TravelType::Travel]))->with('message', [
                'status' => 'success',
                'message' => 'Travel created successfuly',
            ]);
        }
        if ($request->type == TravelType::Omra->value) {
            request()->validate(
                [
                    'name' => 'required|string',
                    'default_price' => 'required|numeric',
                    'description' => 'required|string',
                    'distance' => 'required|numeric',
                ]
            );
            $travel_id = travel::insertGetId([
                'name' => $request->name,
                'description' => $request->description,
                'default_price' => $request->default_price,
                'distance' => $request->distance,
                'type' => TravelType::Omra,
                'created_at' => now()
            ]);
            foreach ($request->file('assets') as $key => $value) {
                $filename = $value->store('travel', 'public');
                Assets::insert([
                    'name' => "omra-$request->name-img-$key",
                    'image' => $filename,
                    'travel_id' => $travel_id,
                    'created_at' => now(),
                ]);
            }
            return redirect(Route('travel.index', ['type' => TravelType::Travel]))->with('message', [
                'status' => 'success',
                'message' => 'Omra created successfuly',
            ]);
        }
    }

    public function edit(Request $request)
    {
        $travel = travel::with('assets')->find($request->id);
        return Inertia::render('Admin/EditTravel', ['travel' => $travel]);
    }

    public function update(Request $request)
    {

        if ($request->type == TravelType::Travel->value) {
            request()->validate(
                [
                    'name' => 'required|string',
                    'default_price' => 'required|numeric',
                    'description' => 'required|string',
                ]
            );

            travel::where('id', $request->id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'default_price' => $request->default_price,
                'distance' => $request->distance,
                'type' => $request->type,
                'updated_at' => now()
            ]);

            $images = Assets::where('travel_id', $request->id)->get();
            foreach ($images as $key => $value) {
                Storage::disk('public')->delete($value->image);
                $value->delete();
            }

            foreach ($request->file('assets') as $key => $value) {
                $filename = $value->store('travel', 'public');
                Assets::insert([
                    'name' => "travel-$request->name-img-$key",
                    'image' => $filename,
                    'travel_id' => $request->id,
                    'created_at' => now(),
                ]);
            }

            return redirect(route('travel.edit', $request->id))->with('message', [
                'status' => 'success',
                'message' => 'Travel Updated successfuly',
            ]);
        }
        if ($request->type == TravelType::Omra->value) {
            request()->validate(
                [
                    'name' => 'required|string',
                    'default_price' => 'required|numeric',
                    'description' => 'required|string',
                    'distance' => 'required|numeric',
                ]
            );

            travel::where('id', $request->id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'default_price' => $request->default_price,
                'distance' => $request->distance,
                'type' => $request->type,
                'updated_at' => now()
            ]);

            $images = Assets::where('travel_id', $request->id)->get();
            foreach ($images as $key => $value) {
                Storage::disk('public')->delete($value->image);
                $value->delete();
            }

            foreach ($request->file('assets') as $key => $value) {
                $filename = $value->store('travel', 'public');
                Assets::insert([
                    'name' => "travel-$request->name-img-$key",
                    'image' => $filename,
                    'travel_id' => $request->id,
                    'created_at' => now(),
                ]);
            }

            return redirect(route('travel.edit', $request->id))->with('message', [
                'status' => 'success',
                'message' => 'Omra Updated successfuly',
            ]);
        }
    }

    public function destroy(Request $request)
    {
        $travel = travel::with('assets')->find($request->id);
        foreach ($travel->assets as $value) {
            Storage::disk('public')->delete($value->image);
            $value->delete();
        }
        $travel->delete();
        return redirect(route('travel.index', ['type' => $travel->type]))->with('message', [
            'status' => 'success',
            'message' => 'Travel deleted successfuly',
        ]);
    }
}
