<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\condition;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConditionController extends Controller
{
    public function index()
    {
        $conditions = condition::all();

        return Inertia::render('Admin/Conditions', ['conditions' => $conditions]);
    }

    public function  store(Request $request)
    {
        request()->validate(
            [
                'title' => 'required',
                'content' => 'required',
            ]
        );
        condition::insert([
            'title' => $request->title,
            'content' => $request->content,
            'created_at' => now()
        ]);
        return redirect(route("conditions.index"))->with('message', [
            'status' => 'success',
            'message' => 'Conditions created successfuly',
        ]);
    }

    public function update(Request $request)
    {
        request()->validate(
            [
                'title' => 'required',
                'content	' => 'required',
            ]
        );

        condition::where('id', $request->id)->update([
            'title' => $request->title,
            'content' => $request->content,
            'updated_at' => now()
        ]);

        return redirect(route("conditions.index"))->with('message', [
            'status' => 'success',
            'message' => 'Conditions created successfuly',
        ]);
    }

    public function destroy(Request $request)
    {
        condition::where('id', $request->id)->delete();

        return redirect(route('conditions.index',))->with('message', [
            'status' => 'success',
            'message' => 'Conditions deleted successfuly',
        ]);
    }
}
