<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = faq::all();

        return Inertia::render('Admin/Faqs', ['faqs' => $faqs]);
    }

    public function  store(Request $request)
    {
        request()->validate(
            [
                'question' => 'required',
                'answer' => 'required',
            ]
        );
        faq::insert([
            'question' => $request->question,
            'answer' => $request->answer,
            'created_at' => now()
        ]);
        return redirect(route("faq.index"))->with('message', [
            'status' => 'success',
            'message' => 'FAQ created successfuly',
        ]);
    }

    public function update(Request $request)
    {
        request()->validate(
            [
                'question' => 'required',
                'answer' => 'required',
            ]
        );

        faq::where('id', $request->id)->update([
            'question' => $request->question,
            'answer' => $request->answer,
            'updated_at' => now()
        ]);

        return redirect(route("faq.index"))->with('message', [
            'status' => 'success',
            'message' => 'FAQ created successfuly',
        ]);
    }

    public function destroy(Request $request)
    {
        faq::where('id', $request->id)->delete();

        return redirect(route('faq.index',))->with('message', [
            'status' => 'success',
            'message' => 'FAQ deleted successfuly',
        ]);
    }
}
