<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\agency;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AgencyController extends Controller
{
    public function index()
    {
        $cordinates = agency::all()->first();
        if ($cordinates) {
            return Inertia::render('Admin/Agency', ['cordinates' => $cordinates]);
        }
        return Inertia::render('Admin/Agency');
    }

    public function  store(Request $request)
    {
        request()->validate(
            [
                'name' => 'required|string',
                'descreption' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
                'adresse' => 'required|string',
                'localisation' => 'required|url',
                'logo' => 'required|image',

            ]
        );
        $filename = $request->file("logo")->store('images', 'public');

        agency::insert([
            'name' => $request->name,
            'descreption' => $request->descreption,
            'email' => $request->email,
            'phone' => $request->phone,
            'adresse' => $request->adresse,
            'localisation' => $request->localisation,
            'logo' => $filename,
            'created_at' => now()
        ]);
        return redirect(route("agency.index"))->with('message', [
            'status' => 'success',
            'message' => 'Agency cordinates created successfuly',
        ]);
    }

    public function update(Request $request)
    {
        request()->validate(
            [
                'name' => 'required|string',
                'descreption' => 'required|string',
                'email' => 'required|email',
                'phone' => 'required|string',
                'adresse' => 'required|string',
                'localisation' => 'required|url',
                'logo' => 'required|image|max:1000000',
                ]
            );
            
            $filename = $request->file("logo")->store('images', 'public');

        agency::where('id', $request->id)->update([
            'name' => $request->name,
            'descreption' => $request->descreption,
            'email' => $request->email,
            'phone' => $request->phone,
            'adresse' => $request->adresse,
            'localisation' => $request->localisation,
            'logo' => $filename,

            'updated_at' => now()
        ]);

        return redirect(route("agency.index"))->with('message', [
            'status' => 'success',
            'message' => 'Agency cordinates updated successfuly',
        ]);
    }
}
