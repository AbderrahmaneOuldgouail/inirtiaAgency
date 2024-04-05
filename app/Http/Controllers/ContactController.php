<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplay;
use App\Models\contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact');
    }
    public function send(Request $request)
    {

        if (Auth::id()) {
            request()->validate(
                [
                    'first_name' => 'string',
                    'last_name' => 'string',
                    'email' => 'email',
                    'subject' => 'required|string',
                    'content' => 'required|string'
                ]
            );
            contact::insert([
                'user_id'  => Auth::id(),
                'first_name' => Auth::user()->first_name,
                'last_name' => Auth::user()->last_name,
                'email' => Auth::user()->email,
                'subject' => $request->subject,
                'content' => $request->content,
                'created_at' => now()
            ]);
        } else {
            request()->validate(
                [
                    'first_name' => 'required|string',
                    'last_name' => 'required|string',
                    'email' => 'required|email',
                    'subject' => 'required|string',
                    'content' => 'required|string'
                ]
            );
            contact::insert([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'subject' => $request->subject,
                'content' => $request->content,
                'created_at' => now()
            ]);
        }

        redirect(route('contact'))->with('message', [
            'statu' => 'success',
            'message' => 'Message send successfuly'
        ]);
    }
    public function showContacts()
    {
        $contacts = contact::all();

        return Inertia::render('Admin/Contact', ['contacts' => $contacts]);
    }

    public function destroy(Request $request)
    {
        contact::where('id', $request->id)->delete();

        return redirect(route('contact.index'))->with('message', [
            'status' => 'success',
            'message' => 'Contact deleted successfuly',
        ]);
    }

    public function replay(Request $request)
    {
        Mail::send(new ContactReplay($request->email, $request->message, $request->first_name));
        return redirect(route('contact.index'))->with('message', [
            'status' => 'success',
            'message' => 'Message sended successfuly'
        ]);
    }
}
