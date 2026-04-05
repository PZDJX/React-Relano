<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Gender;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::with('gender');

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
        }

        return $query->paginate(10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'gender_id' => 'required|exists:genders,id',
            'image' => 'nullable|image|max:2048',
            'password' => 'required|string|min:8',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        $validated['password'] = Hash::make($validated['password']);

        $user = User::create($validated);

        return response()->json($user->load('gender'), 201);
    }

    public function show(User $user)
    {
        return $user->load('gender');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'gender_id' => 'required|exists:genders,id',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image
            if ($user->image) {
                \Storage::disk('public')->delete($user->image);
            }
            $validated['image'] = $request->file('image')->store('images', 'public');
        }

        $user->update($validated);

        return $user->load('gender');
    }

    public function destroy(User $user)
    {
        if ($user->image) {
            \Storage::disk('public')->delete($user->image);
        }
        $user->delete();

        return response()->json(null, 204);
    }
}
