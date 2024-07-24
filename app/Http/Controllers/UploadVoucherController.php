<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\GuestType;
use Illuminate\Http\Request;
use App\Services\ImgurService;
use App\Services\Gpt4VisionService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadVoucherController extends Controller
{
    protected $gpt4VisionService;
    protected $imgurService;

    public function __construct(Gpt4VisionService $gpt4VisionService, ImgurService $imgur)
    {
        $this->gpt4VisionService = $gpt4VisionService;
        $this->imgurService = $imgur;
    }

    public function index(Room $room)
    {
        return inertia('Upload/Index',[
            'guestTypes' => GuestType::where('user_id',auth()->user()->id)->get(),
            'room' => $room
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        
        if ($request->file('image')) {
            try {
                $path = $request->file('image')->store('images');
                $fullPath = config('app.env') === 'local' ? Storage::path($path) : Storage::url($path);
                $result = $this->imgurService->uploadImage($fullPath);
                Log::info('Image uploaded, response received');
                $result = $this->gpt4VisionService->analyzeImage($result['data']['link'],$fullPath);
                return response()->json($result);
            } catch (\Throwable $th) {
                return response()->json(["message error" => $th->getMessage()]);
            }
        }

        return response()->json(['error' => 'Image upload failed'], 400);
    }
}
