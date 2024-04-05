<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        request()->validate(
            [
                'content' => 'required|string',
            ]
        );
        if ($request->type == 'travel') {
            comment::insert([
                'user_id'  => Auth::id(),
                'travel_id' => $request->id,
                'content' => $request->content,
                'created_at' => now()
            ]);
            return redirect(Route('travel.details', $request->id))->with(
                'message',
                ['CommentMessage' => [
                    'status' => 'success',
                    'message' => 'Commented successfuly',
                ]]
            );
        } else if (($request->type == 'hotel')) {
            comment::insert([
                'user_id'  => Auth::id(),
                'hotel_id' => $request->id,
                'content' => $request->content,
                'created_at' => now()
            ]);
            return redirect(Route('hotel.details', $request->id))->with(
                'message',
                ['CommentMessage' => [
                    'status' => 'success',
                    'message' => 'Commented successfuly',
                ]]
            );
        }
    }

}
